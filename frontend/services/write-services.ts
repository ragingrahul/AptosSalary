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
  employeeCommitment: string,
  salary: number,
  signAndSubmitTransaction: (transaction: InputTransactionData) => Promise<{ hash: string }>
) {
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const rawTxn: InputTransactionData = {
    data: {
      function: `${process.env.NEXT_PUBLIC_MODULE_ADDRESS}::simplepayroll::add_employee`,
      functionArguments: [employeeAddress ,employeeCommitment, process.env.NEXT_PUBLIC_CONTRACT_OWNER, salary * 1e8,],
    }
  }
  const pendingTxn = await signAndSubmitTransaction(rawTxn);
  const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
  return response
}

export async function verifyEmployee(
  employeeAddress: string,
  inputString: string,
  signAndSubmitTransaction: (transaction: InputTransactionData) => Promise<{ hash: string }>
){
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
 
  const alphaRegex = /alpha: "(.*?)"/;
  const betaRegex = /beta: "(.*?)"/;
  const gammaRegex = /gamma: "(.*?)"/;
  const deltaRegex = /delta: "(.*?)"/;
  const gammaAbcRegex = /gamma_abc: \[(.*?)\]/; 
  const proofARegex = /Proof { a: "(.*?)"/;
  const proofBRegex = /b: "(.*?)"/;
  const proofCRegex = /c: "(.*?)"/;

  const alphaMatch = alphaRegex.exec(inputString);
  const betaMatch = betaRegex.exec(inputString);
  const gammaMatch = gammaRegex.exec(inputString);
  const deltaMatch = deltaRegex.exec(inputString);
  const gammaAbcMatch = gammaAbcRegex.exec(inputString);
  const proofAMatch = proofARegex.exec(inputString);
  const proofBMatch = proofBRegex.exec(inputString);
  const proofCMatch = proofCRegex.exec(inputString);

  const alpha = alphaMatch ? alphaMatch[1] : null;
  const beta = betaMatch ? betaMatch[1] : null;
  const gamma = gammaMatch ? gammaMatch[1] : null;
  const delta = deltaMatch ? deltaMatch[1] : null;
  const gammaAbc = gammaAbcMatch ? gammaAbcMatch[1].split(',').map(item => item.trim().replace(/"/g, '')) : [];  // Parsing gamma_abc array
  const proofA = proofAMatch ? proofAMatch[1] : null;
  const proofB = proofBMatch ? proofBMatch[1] : null;
  const proofC = proofCMatch ? proofCMatch[1] : null;

  console.log(inputString);
  console.log("Alpha:", alpha);
  if (alpha && beta && gamma && delta && gammaAbc && proofA && proofB && proofC) {
      console.log("Alpha Vector", Array.from(Buffer.from(alpha, 'hex')));
      console.log("Beta Vector", Array.from(Buffer.from(beta, 'hex')));
      console.log("Gamma Vector", Array.from(Buffer.from(gamma, 'hex')));
      console.log("Delta Vector", Array.from(Buffer.from(delta, 'hex')));
      console.log("Gamma_abc_1 Vector", Array.from(Buffer.from(gammaAbc[0], 'hex')));
      console.log("Gamma_abc_2 Vector", Array.from(Buffer.from(gammaAbc[1], 'hex')));
      console.log("Proof A Vector", Array.from(Buffer.from(proofA, 'hex')));
      console.log("Proof B Vector", Array.from(Buffer.from(proofB, 'hex')));
      console.log("Proof C Vector", Array.from(Buffer.from(proofC, 'hex')));
      const combinedArray = [
          Array.from(Buffer.from(gammaAbc[0], 'hex')),
          Array.from(Buffer.from(gammaAbc[1], 'hex'))
      ];
      const combinedInputs=[
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
      console.log(combinedInputs)
      console.log(combinedArray)
      const rawTxn: InputTransactionData = {
          data: {
          function: `${process.env.NEXT_PUBLIC_MODULE_ADDRESS}::simplepayroll::verify_employee`,
          functionArguments: [
                  process.env.NEXT_PUBLIC_CONTRACT_OWNER,
                  employeeAddress,
                  Array.from(Buffer.from(alpha, 'hex')),
                  Array.from(Buffer.from(beta, 'hex')),
                  Array.from(Buffer.from(gamma, 'hex')),
                  Array.from(Buffer.from(delta, 'hex')),
                  combinedArray,
                  combinedInputs,
                  Array.from(Buffer.from(proofA, 'hex')),
                  Array.from(Buffer.from(proofB, 'hex')),
                  Array.from(Buffer.from(proofC, 'hex')),
              ],
          }
      }
      const pendingTxn = await signAndSubmitTransaction(rawTxn);
      const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
      return response
  } else {
      console.log("Alpha is null or undefined");
  }
}

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

export async function fundTreasuryMove(
  amount: number,
  signAndSubmitTransaction: (transaction: InputTransactionData) => Promise<{ hash: string }>
) {
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const rawTxn: InputTransactionData = {
    data: {
      function: `${process.env.NEXT_PUBLIC_MODULE_ADDRESS}::simplepayroll::fund_organization_treasury`,
      functionArguments: [process.env.NEXT_PUBLIC_CONTRACT_OWNER,amount],
    }
  }
  const pendingTxn = await signAndSubmitTransaction(rawTxn);
  const response = await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
  return response
}
