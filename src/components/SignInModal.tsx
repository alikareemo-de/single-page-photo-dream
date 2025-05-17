
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { signInUser } from "@/services/auth";
import { useUser } from "@/contexts/UserContext";
import { Loader2 } from "lucide-react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  openRegisterModal?: () => void;
}

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, openRegisterModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUser();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const user = await signInUser({
        username: values.username,
        password: values.password,
      });
      
      setUser(user);
      toast.success(`Welcome back, ${user.firstName}!`);
      onClose();
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to sign in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] max-w-[95%] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-tourism-ocean">Sign In</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123" {...field} className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="h-9" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4 gap-2 sm:gap-0 flex-col sm:flex-row">
              <Button type="button" variant="outline" onClick={onClose} className="h-8 text-sm">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-tourism-ocean hover:bg-tourism-ocean/90 text-white h-8 text-sm"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </DialogFooter>
          </form>
        </Form>

        <div className="text-center mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Button 
            type="button"
            variant="link"
            onClick={() => {
              onClose();
              if (openRegisterModal) openRegisterModal();
            }}
            className="text-tourism-teal hover:text-tourism-ocean p-0 h-auto mt-1"
          >
            Create an account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
