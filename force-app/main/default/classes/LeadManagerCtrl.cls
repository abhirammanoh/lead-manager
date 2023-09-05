public class LeadManagerCtrl {
	@AuraEnabled(cacheable=true)
    public static void LeadData(){
        HttpRequest request=new HttpRequest();
        request.setEndpoint('callout:Dev_2/services/apexrest/Leads');
        request.setHeader('Content-Type', 'application/json');
        request.setMethod('GET');
        http http=new http();
        HttpResponse response=http.send(request);
        List<LeadWrapper>Leads=new List<LeadWrapper>();
        if(response.getStatusCode()==200){
            List<object> data=(List<object>)JSON.deserializeUntyped(response.getBody());
           
            for(object obj:data){
                Map<string,object>newMap=(Map<string,object>)obj;
                LeadWrapper lw=new Leadwrapper((string)newMap.get('Name'),(string)newMap.get('Company'),(string)newMap.get('Email'),(string)newMap.get('Status'));
                Leads.add(lw);
            }
        }
        system.debug(Leads);
        
    }
    class LeadWrapper{
        public LeadWrapper(string Name,string Com,String em,string industryy){
                Fname=Name;
                company=com;
                email=em;
                industry=industryy;
        }
        public string Fname;
        public string company;
        public string email;
        public string industry;
    }
   
}