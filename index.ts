import{
    APIGatewayProxyHandler,
    APIGatewayEvent,
    APIGatewayProxyResult,
    Context,
  } from 'aws-lambda';
  
  const handler: APIGatewayProxyHandler= async(event: APIGatewayEvent, context:Context)=>{
    let body={}
    const res: APIGatewayProxyResult={
      headers:{
      'Access-Control-Allow-origin':'*',
      'Content-Type':'application/json',
      },
      statusCode:200,
      body:'',
    };
    
    try{
      const method=event.httpMethod;
      const path = event.path;
      if(path === '/files')
      {
        if(method ==='GET')
        {
          body={files:[{name:'fake.jpeg'}]};
        }else if(method === 'DELETE'){
          body={};
        }else if (method === 'POST')
        {
          body={};
        }
      }
      res.body=JSON.stringify(body);
      
      
    }
    catch(err)
    {
      res.statusCode=500;
      res.body=JSON.stringify({error:err.message});
      console.error(err);
    }
    return res;
  };
    