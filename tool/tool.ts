class Tool{
  static instance:Tool
  static graphName:string;
  static graphIndex:number;

  constructor(){
    Tool.graphName='d';
    Tool.graphIndex=0;
  }

  static getInstance(){
    if(!Tool.instance){
      Tool.instance=new Tool();
    } 
    return Tool.instance;
  }
  
  getName():string{
    return Tool.graphName+Tool.graphIndex++
  }
}

export default Tool.getInstance();