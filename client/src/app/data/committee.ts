export type CommitteeMember = {
  id:number; name:string; role:string; affiliation:string; photo:string; shortBio:string; profileUrl?:string; tags?:string[]
}
export const COMMITTEE: CommitteeMember[] = [
  { id:1, name:'Dr. Rasoul Karimi', role:'Chief Judge', affiliation:'Web & Game Studio', photo:'/images/committee/Dr_Karimi.png', shortBio:'Expert in disaster risk reduction and community resilience.', tags:['Risk','Resilience'] },
  { id:2, name:'Zahra Rahimi', role:'Innovation Lead', affiliation:'University Center for Growth', photo:'/images/committee/user.png', shortBio:'Startup mentor, passive defense enthusiast.' },
]
