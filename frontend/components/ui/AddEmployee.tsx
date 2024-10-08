import { addEmployeeAPI } from "@/api/api";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { generateCommitment } from "@/utils/helper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    employeeName: z.string().min(1, {
        message: "Employee Name is required.",
    }),
    walletAddress: z.string().min(1, {
      message: "Wallet Address is required.",
    }),
    jobTitle: z.string().min(2, {
      message: "Job Title must be at least 2 characters.",
    }),
    dailySalary: z.string().min(1, {
      message: "Daily Salary is required.",
    }),
  });

export function AddEmployee() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          employeeName: "",
          walletAddress: "",
          jobTitle: "",
          dailySalary: "",
        },
      });
    
      // Handle form submission
      async function onSubmit(data: z.infer<typeof FormSchema>) {
        const commitment = generateCommitment(data.dailySalary, data.jobTitle, data.walletAddress);
        try {
            const result = await addEmployeeAPI(data.walletAddress, data.jobTitle, data.dailySalary);
            
          } catch (error) {
            
          }
    
        console.log("Generated Commitment:", commitment);
      }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="purple">Add Employee</Button>
            </DialogTrigger>
            <DialogContent className="w-[900px] ">
                <DialogHeader>
                    <DialogTitle className="text-purple">New Employee</DialogTitle>
                    <DialogDescription>
                        After adding an employee, they must perform a Zero Knowledge Proof Verification before receiving payments.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* EmployeeName Input */}
                        <FormField
                            control={form.control}
                            name="employeeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Employee Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Wallet Address Input */}
                        <FormField
                            control={form.control}
                            name="walletAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Wallet Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Job Title Input */}
                        <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Job Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Daily Salary Input */}
                        <FormField
                            control={form.control}
                            name="dailySalary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Daily Dalary" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" variant="purple" onClick={form.handleSubmit(onSubmit)}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
