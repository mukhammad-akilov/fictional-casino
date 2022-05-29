interface ProjectTheme {
    [key: string]: {
     [key: string]: string
 }
 }
 
 export const ProjectTitle = "Fictional Casino";
 
 export const ApiUrl = process.env.NODE_ENV === 'production' ? "http://192.168.100.31:8088/" : "http://192.168.100.31:8088/";
 
 export const projectTheme: ProjectTheme = {
     primary: {
         color: "#750AC9",
         textColor: "#FFFFFF",
     },
     secondary: {
         color: "#E3E30B",
         textColor: "#000000",
     },
 }