@RestResources (urlMapping= '/Leads/*')
global class LeadManagerWebService{
    @HttpGet
    global static Lead getLeads(){
        Lead openLeads=[SELECT Name,Email,Company,Status,Industry FROM Lead where Status='Open' limit 50];
        return openLeads;
    }
}