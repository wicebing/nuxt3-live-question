export const useHome = async () => {    
  const data = await $fetch("https://nuxr3.zeabur.app/api/v1/home/news/")
    return data

};
