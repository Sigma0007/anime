const generateMockData = () => {
  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    description: `Description for item ${index + 1}`
  }));
};

export const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockData());
    }, 500);
  });
};