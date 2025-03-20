
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import { Check, ChevronsRight, CreditCard, Send, User, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
=======
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
<<<<<<< HEAD
import { Checkbox } from "@/components/ui/checkbox";
=======
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
import FamilyTypeCard from './FamilyTypeCard';
import PaymentSummary from './PaymentSummary';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
<<<<<<< HEAD
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '@/api/stripe';
=======
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b

// Define the base form schema with proper transformations
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
<<<<<<< HEAD
  // Address fields for Indian export regulations
  addressLine1: z.string().min(1, {
    message: "Address is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  postalCode: z.string().min(6, {
    message: "Valid postal code is required.",
  }),
=======
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
  // Use string type for form inputs but transform to number for validation
  adultCount: z.string().transform(val => Number(val)).refine((val) => val > 0, {
    message: "At least one adult is required.",
  }),
  kidsCount: z.string().transform(val => Number(val)),
<<<<<<< HEAD
  isTulipParent: z.boolean().default(false),
=======
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
});

interface RegistrationFormProps {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ formStep, setFormStep }) => {
  const [familyCategory, setFamilyCategory] = useState<string>('');
  const [adultCount, setAdultCount] = useState<number>(1);
  const [kidsCount, setKidsCount] = useState<number>(0);
  const [tShirtSizes, setTShirtSizes] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
<<<<<<< HEAD
  const [isTulipParent, setIsTulipParent] = useState<boolean>(false); // New state
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
=======
  const navigate = useNavigate();

  // Initialize the form with react-hook-form
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
<<<<<<< HEAD
      addressLine1: "",
      city: "",
      postalCode: "",
      adultCount: 1,
      kidsCount: 0,
      isTulipParent: false,
    },
  });

=======
      adultCount: "1", // String for the form field
      kidsCount: "0", // String for the form field
    },
  });
  
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
  useEffect(() => {
    // Determine family category based on adults and kids count
    const determineFamilyCategory = () => {
      if (adultCount >= 1) {
        if (kidsCount === 0) {
          return 'One Family, No Kids';
        } else if (kidsCount === 2) {
          return 'One Family, Two Kids';
        } else if (kidsCount > 2) {
          return 'One Family, Multiple Kids';
        } else {
          return 'One Family, One Kid';
        }
      }
      return 'Custom Case';
    };

    // Update family category
    setFamilyCategory(determineFamilyCategory());

    // Calculate payment amount based on category
    const calculatePayment = () => {
<<<<<<< HEAD
      const adultPrice = 20; // Price per adult
      const kidPrice = 20; // Price per kid
      return (adultCount * adultPrice) + (kidsCount * kidPrice);
=======
      const basePrice = 50; // Base price per adult
      const kidPrice = 25; // Price per kid
      return (adultCount * basePrice) + (kidsCount * kidPrice);
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
    };

    setTotalAmount(calculatePayment());

    // Initialize t-shirt sizes array based on total participants
    const totalParticipants = adultCount + kidsCount;
    setTShirtSizes(Array(totalParticipants).fill('M'));
  }, [adultCount, kidsCount]);

  const onSubmitContactDetails = (data: z.infer<typeof formSchema>) => {
    // Convert string form values to numbers for state
    setAdultCount(Number(data.adultCount));
    setKidsCount(Number(data.kidsCount));
<<<<<<< HEAD
    setIsTulipParent(data.isTulipParent); // Save the new field value
=======
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
    setFormStep(2);
    
    toast("Contact details saved successfully", {
      description: "Moving to participant details",
      duration: 3000,
    });
  };

  const handleTShirtSizeChange = (index: number, size: string) => {
    const newSizes = [...tShirtSizes];
    newSizes[index] = size;
    setTShirtSizes(newSizes);
  };

<<<<<<< HEAD
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    setIsProcessingPayment(true);
    
=======
  const handleFinalSubmit = async () => {
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
    try {
      // Get form data
      const formData = form.getValues();
      
      // Prepare registration data for Supabase
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        adult_count: adultCount,
        kids_count: kidsCount,
        family_category: familyCategory,
        total_amount: totalAmount,
<<<<<<< HEAD
        payment_status: 'pending',
        is_tulip_parent: formData.isTulipParent,
        t_shirt_sizes: tShirtSizes // Add this line to include t-shirt sizes
      };
      
      // Insert data into Supabase first
      const { data: regData, error: regError } = await supabase
=======
        payment_status: 'pending'
      };
      
      toast("Processing registration...", {
        duration: 3000,
      });
      
      // Insert data into Supabase
      const { data, error } = await supabase
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
        .from('registrations')
        .insert(registrationData)
        .select()
        .single();
      
<<<<<<< HEAD
      if (regError) {
        console.error("Supabase error:", regError);
        throw regError;
      }
      
      // Create payment intent using the imported function
      const { clientSecret } = await createPaymentIntent(
        totalAmount,
        formData.email,
        regData.id,
        formData.name,
        {
          line1: formData.addressLine1,
          city: formData.city,
          postal_code: formData.postalCode,
          country: 'IN'
        }
      );
      
      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }
      
      // Confirm the payment
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }
      
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      });
      
=======
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
      if (error) {
        throw error;
      }
      
<<<<<<< HEAD
      if (paymentIntent.status === 'succeeded') {
        // Update registration status to paid
        const { error: updateError } = await supabase
          .from('registrations')
          .update({ 
            payment_status: 'paid',
            transaction_id: paymentIntent.id,
            updated_at: new Date().toISOString()
          })
          .eq('id', regData.id);
        
        if (updateError) {
          console.error('Error updating payment status:', updateError);
        }
        
        // Navigate to success page
        navigate('/success', { 
          state: { 
            registrationData: {
              name: registrationData.name,
              email: registrationData.email,
              adultCount: registrationData.adult_count,
              kidsCount: registrationData.kids_count,
              totalAmount: registrationData.total_amount,
              tShirtSizes: tShirtSizes
            },
            transactionId: paymentIntent.id
          } 
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed', {
        description: error.message || 'Please try again or contact support',
      });
    } finally {
      setIsProcessingPayment(false);
=======
      // Navigate to success page
      navigate('/success', { 
        state: { 
          registrationData: {
            ...registrationData,
            tShirtSizes: tShirtSizes
          },
          transactionId: data.id
        } 
      });
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast.error("Registration failed", {
        description: "Please try again or contact support",
      });
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Registration</h2>
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                formStep >= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {formStep === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitContactDetails)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <FormLabel>Full Name</FormLabel>
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="rounded-xl h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="email@example.com" 
                              type="email" 
                              {...field} 
                              className="rounded-xl h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(123) 456-7890" 
                              type="tel" 
                              {...field} 
                              className="rounded-xl h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="adultCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Adults</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
<<<<<<< HEAD
                              defaultValue={String(field.value)}
=======
                              defaultValue={field.value}
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
                            >
                              <SelectTrigger className="rounded-xl h-11">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <SelectItem key={num} value={String(num)}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="kidsCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Kids</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
<<<<<<< HEAD
                              defaultValue={String(field.value)}
=======
                              defaultValue={field.value}
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
                            >
                              <SelectTrigger className="rounded-xl h-11">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {[0, 1, 2, 3, 4, 5].map((num) => (
                                  <SelectItem key={num} value={String(num)}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
<<<<<<< HEAD

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="isTulipParent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Are you a Tulip Kids Student's parent?
                            </FormLabel>
                            <FormDescription>
                              Please check this box if your child is currently enrolled at Tulip Kids.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator className="my-4" />

                <h3 className="text-lg font-medium mb-3">Billing Address</h3>
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Street address" 
                          {...field} 
                          className="rounded-xl h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="City" 
                            {...field} 
                            className="rounded-xl h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Postal code" 
                            {...field} 
                            className="rounded-xl h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

=======
                </div>
                
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
                <Button 
                  type="submit" 
                  className="w-full rounded-xl h-12 btn-hover-effect"
                >
                  Continue <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
        
        {formStep === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Family Category</h3>
                <FamilyTypeCard category={familyCategory} adultCount={adultCount} kidsCount={kidsCount} />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">T-Shirt Sizes</h3>
                <Card className="rounded-xl overflow-hidden">
                  <CardContent className="p-4">
                    {[...Array(adultCount + kidsCount)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">
                            {index < adultCount 
                              ? `Adult ${adultCount > 1 ? index + 1 : ''}` 
                              : `Child ${kidsCount > 1 ? (index - adultCount) + 1 : ''}`}
                          </p>
                        </div>
                        <Select 
                          onValueChange={(value) => handleTShirtSizeChange(index, value)} 
                          defaultValue={tShirtSizes[index]}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="XS">XS</SelectItem>
                            <SelectItem value="S">S</SelectItem>
                            <SelectItem value="M">M</SelectItem>
                            <SelectItem value="L">L</SelectItem>
                            <SelectItem value="XL">XL</SelectItem>
                            <SelectItem value="XXL">XXL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl h-12"
                  onClick={() => setFormStep(1)}
                >
                  Back
                </Button>
                <Button 
                  className="flex-1 rounded-xl h-12 btn-hover-effect"
                  onClick={() => setFormStep(3)}
                >
                  Continue <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        
        {formStep === 3 && (
          <motion.div
            key="step3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <PaymentSummary 
                familyCategory={familyCategory}
                adultCount={adultCount}
                kidsCount={kidsCount}
                totalAmount={totalAmount}
              />
              
              <div className="border border-dashed p-4 rounded-xl bg-primary/5">
                <div className="flex items-center mb-2">
                  <CreditCard className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-medium">Payment Details</h3>
                </div>
<<<<<<< HEAD
                
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <CardElement 
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-xl h-12"
                      onClick={() => setFormStep(2)}
                      disabled={isProcessingPayment}
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1 rounded-xl h-12 bg-primary hover:bg-primary/90 text-white btn-hover-effect"
                      onClick={handlePaymentSubmit}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" /> Pay ${totalAmount.toFixed(2)}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
=======
                <p className="text-sm text-muted-foreground">
                  Upon submitting your registration, you'll be redirected to our secure payment gateway 
                  to complete your payment of ${totalAmount.toFixed(2)}.
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-xl h-12"
                  onClick={() => setFormStep(2)}
                >
                  Back
                </Button>
                <Button 
                  className="flex-1 rounded-xl h-12 bg-primary hover:bg-primary/90 text-white btn-hover-effect"
                  onClick={handleFinalSubmit}
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Pay ${totalAmount.toFixed(2)}
                </Button>
>>>>>>> ffda60f784b53587f363a5f68a17b0e0ffd6809b
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegistrationForm;
