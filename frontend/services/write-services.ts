import { InputTransactionData } from '@aptos-labs/wallet-adapter-react'
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'


export async function createOrgMove(
  org_name: string,
  signAndSubmitTransaction: (transaction: InputTransactionData) => Promise<{ hash: string }>
) {
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const rawTxn: InputTransactionData = {
    data: {
      function: `${process.env.NEXT_PUBLIC_MODULE_ADDRESS}::simplepayroll::add_organization`,
      functionArguments: [ process.env.NEXT_PUBLIC_CONTRACT_OWNER, org_name],
    }
  }
  const pendingTxn = await signAndSubmitTransaction(rawTxn);
  const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
  return response
}

export async function addEmployeeMove(
  employeeAddress: string,
  salary: number,
  activity: string,
  signAndSubmitTransaction: (transaction: InputTransactionData) => Promise<{ hash: string }>
) {
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const rawTxn: InputTransactionData = {
    data: {
      function: `${process.env.NEXT_PUBLIC_MODULE_ADDRESS}::simplepayroll::add_employee`,
      functionArguments: [employeeAddress, process.env.NEXT_PUBLIC_CONTRACT_OWNER, salary * 1e8, activity],
    }
  }
  const pendingTxn = await signAndSubmitTransaction(rawTxn);
  const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
  return response
}

// export async function verifyEmployee(address: Address) {
//   const result = await writeContract(config, {
//     chainId: baseSepolia.id,
//     abi: payrollAbi,
//     functionName: 'verifyEmployee',
//     args: [address],
//     address: PAYROLL_CONTRACT_ADDRESS,
//   })
//   console.log('verifying employee', result)
//   return result
// }

export async function paySalaryMove(
  employeeAddress: string,
  signAndSubmitTransaction: (transaction: InputTransactionData) => Promise<{ hash: string }>
){
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const rawTxn: InputTransactionData = {
    data: {
      function: `${process.env.NEXT_PUBLIC_MODULE_ADDRESS}::simplepayroll::payout`,
      functionArguments: [employeeAddress, process.env.NEXT_PUBLIC_CONTRACT_OWNER],
    }
  }
  const pendingTxn = await signAndSubmitTransaction(rawTxn);
  const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
  return response
}

// export async function paySalary(address: Address) {
//   const result = await writeContract(config, {
//     chainId: baseSepolia.id,
//     abi: payrollAbi,
//     functionName: 'payout',
//     args: [address],
//     address: PAYROLL_CONTRACT_ADDRESS,
//   })
//   console.log('payout to employee', result)
//   return result
// }
