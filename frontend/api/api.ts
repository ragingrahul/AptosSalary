export async function addEmployeeAPI(walletAddress: string, jobTitle: string, dailySalary: string) {
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: walletAddress, // Assuming name is walletAddress
          job_title: jobTitle,
          address: walletAddress,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add employee.");
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw new Error("An unexpected error occurred.");
    }
  }

  // services/userService.ts
export async function getUserByAddress(address: string) {
    try {
      const response = await fetch(`http://localhost:8080/user/${address}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to get user with address: ${address}`);
      }
  
      const user = await response.json();
      return user;
    } catch (error) {
      console.error("Error fetching user by address:", error);
      throw error;
    }
  }

// services/userService.ts
export async function getAllUsers() {
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
  
      const users = await response.json();
      return users; // Return array of users
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  }

// services/zkpService.ts
export async function verifyUserCommitment(address: string) {
    try {
      const response = await fetch(`http://localhost:8080/verify/${address}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to verify user with address: ${address}`);
      }
  
      const result = await response.json();
      return result; // Return the verification result, VK, and inputs
    } catch (error) {
      console.error("Error verifying user commitment:", error);
      throw error;
    }
  }
  
  