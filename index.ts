import * as AWS from 'aws-sdk'
import{
    APIGatewayProxyHandler,
    APIGatewayEvent,
    APIGatewayProxyResult,
    Context,
  } from 'aws-lambda';

  const BUCKET_NAME = "test2231";
  const s3 = new AWS.S3();

  const getFiles = async () =>
  {
    //   const files = [{name:'fake.jpeg'}];
    //   return {files};

    const files :Array<{name:string}>=[];
    const data = await s3.listObjectsV2({Bucket:BUCKET_NAME}).promise();
    if(data && data.Contents)
    {
        for(const item of data.Contents)
        {
            files.push({name:item.Key})
        }
        
    }
    return {files}

  }

  const deleteFiles = async (name:string)=>
  {
    await s3.deleteObject({Key:name,
        Bucket:BUCKET_NAME}).promise();
    return{};
  }

  const postFiles = async (name:string, contentType:string,content:string)=>{
      await s3.upload({Key:name,
    Bucket:BUCKET_NAME,
ContentType:contentType,
Body:content}).promise();
return{};
  };

  
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
      if(path === '/bestanden')
      {
        if(method ==='GET')
        {
          body={files:[{name:'bestand'}]};
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
    