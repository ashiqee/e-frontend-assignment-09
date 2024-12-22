import { getMyReviews } from "@/services/ReviewServices";
import ReviewsHistoryTable from "../../components/Tables/ReviewHistoryTable";

export default async function ReviewsManage() {


    const {data}  =  await getMyReviews()

    
    if(!data){
        return <>Loading....</>
    }

    return (
        <>
        
        
        
<h2 className="text-xl mb-10">Reviws History</h2>
        <ReviewsHistoryTable reviewData={data}/>
        
        </>
    );
}