
import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import SignInModal from './SignInModal';
import RegisterModal from './RegisterModal';
import { toast } from 'sonner';

interface AuthCheckProps {
  children: React.ReactNode;
  fallbackMessage?: string;
  showToast?: boolean;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ 
  children, 
  fallbackMessage = "Please sign in to continue",
  showToast = true
}) => {
  const { user } = useUser();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openSignInModal = () => {
    setIsRegisterModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsSignInModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (showToast) {
      toast.info(fallbackMessage);
    }
    
    openSignInModal();
  };

  if (user) {
    // User is authenticated, render children normally
    return <>{children}</>;
  }

  // User is not authenticated, clone children and add click handler
  const childrenWithAuth = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onClick: handleClick,
      });
    }
    return child;
  });

  return (
    <>
      {childrenWithAuth}
      
      {/* Modals with cross-referencing */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)}
        openRegisterModal={openRegisterModal}
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)}
        openSignInModal={openSignInModal}
      />
    </>
  );
};

export default AuthCheck;
