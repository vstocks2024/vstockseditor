
const { S3Client,GetObjectCommand,PutObjectCommand} =require("@aws-sdk/client-s3");
const { getSignedUrl }=require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.NEXT_PUBLIC_VSTOCKS_BUCKET_NAME as string;
const region = process.env.NEXT_PUBLIC_VSTOCKS_REGION as string;
const accessKeyId = process.env.NEXT_PUBLIC_VSTOCKS_ACCESS_KEY as string;
const secretAccessKey = process.env.NEXT_PUBLIC_VSTOCKS_SECRET_KEY as string;


const s3Client=new S3Client({
    region,
    credentials:{
        accessKeyId,
        secretAccessKey
    }
})

export async function getObjectURL(key:string)
{
    
    const command=new GetObjectCommand({
        Bucket:bucketName,
        Key:key
    });
    const url= await getSignedUrl(s3Client,command);
    return url;
}
export async function putObject(filename:string,contentType:string)
{
const command=new PutObjectCommand({
Bucket:bucketName,
Key:`uploads/user-uploads/${filename}`,
ContentType:contentType
});
const url=await getSignedUrl(s3Client,command);
return url;
}







