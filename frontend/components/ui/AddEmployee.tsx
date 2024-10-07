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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddEmployee() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="purple">Add Employee</Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] ">
        <DialogHeader>
          <DialogTitle className="text-purple">New Employee</DialogTitle>
          <DialogDescription>
          After adding an employee, they must perform a Zero Knowledge Proof Verification before receiving payments.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="name" value="Wallet Address" className="col-span-4" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="username" value="Job Title" className="col-span-4" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input id="username" value="Daily Salary" className="col-span-4" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="purple" >Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
