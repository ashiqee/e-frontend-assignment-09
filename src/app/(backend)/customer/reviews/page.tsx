import { getMyReviews } from "@/services/ReviewServices";
import ReviewsHistoryTable from "../../components/Tables/ReviewHistoryTable";

export default async function ReviewsManage() {


    const {data}  =  await getMyReviews()

    
    if(!data){
        return <>Loading....</>
    }

    return (
        <>
        
        
        

        <ReviewsHistoryTable reviewData={data}/>
        
        </>
    );
}