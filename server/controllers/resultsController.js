import Review from '../models/Review.js'
import Idea from '../models/Idea.js'

export async function computeResults(req,res){
  // جمع نمرات کل هر ایده و اعمال قانون تساوی
  const reviews = await Review.aggregate([
    { $group: {
        _id: '$idea_id',
        total: { $sum: '$total_score' },
        avgInnovation: { $avg: '$scores.innovation' },
        avgImpact: { $avg: '$scores.impact' }
    }}
  ])
  // گرفتن زمان ثبت برای تساوی نهایی
  const ideaTimes = await Idea.find({ _id: { $in: reviews.map(r=>r._id) } }).select('createdAt').lean()
  const timeMap = new Map(ideaTimes.map(i=>[String(i._id), i.createdAt]))
  reviews.sort((a,b)=>{
    if(b.total !== a.total) return b.total - a.total
    if((b.avgInnovation||0)!==(a.avgInnovation||0)) return (b.avgInnovation||0) - (a.avgInnovation||0)
    if((b.avgImpact||0)!==(a.avgImpact||0)) return (b.avgImpact||0) - (a.avgImpact||0)
    const ta = timeMap.get(String(a._id)) || 0
    const tb = timeMap.get(String(b._id)) || 0
    return ta - tb // زودتر ارسال‌شده بالاتر
  })
  res.json(reviews)
}
