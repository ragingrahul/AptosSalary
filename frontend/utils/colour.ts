export const getColorClass = (type:string) => {
    switch (type) {
      case 'order1':
        return 'text-green-500';
      case 'order2':
        return 'text-yellow-500';
      case 'order3':
        return 'text-blue-500';
      case 'order4':
        return 'text-red-500';
      default:
        return 'text-purple'; 
    }
};