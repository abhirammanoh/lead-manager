@RestResource (urlMapping= '/Leads/*')
global class LeadManagerWebService{
    @HttpGet
    global static List<Lead> getLeads(){
        List<Lead>openLeads=[SELECT Name,Email,Company,Status,Industry FROM Lead where Status='Open - Not Contacted' limit 50];
        return openLeads;
    }
}