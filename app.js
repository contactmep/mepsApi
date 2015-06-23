var request = require('request');
var meps = {};

request('http://www.europarl.europa.eu/meps/en/json/getBodyValues.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var EurParlData = JSON.parse(body);
    for (mep in EurParlData.result){
    	meps[EurParlData.result[mep].persId] = {
    		id:EurParlData.result[mep].persId,
    		fullName:EurParlData.result[mep].fullName,
    		countryCode:EurParlData.result[mep].countryCode,
    		countryLabel:EurParlData.result[mep].countryLabel,
    		politicalGroupCode:EurParlData.result[mep].politicalGroupCode,
    		politicalGroupLabel:EurParlData.result[mep].politicalGroupLabel,
    		politicalGroupIcon: 'http://www.europarl.europa.eu/ep_framework/img/group/group_icon_' + EurParlData.result[mep].politicalGroupCode + '.png',
    		nationalPoliticalGroupLabel:EurParlData.result[mep].nationalPoliticalGroupLabel
    	}
    }
    request('http://www.epnewshub.eu/feederfrontendapi/contributors/1?limit=8000&offset=0', function (error, response, body) {
    	if (!error && response.statusCode == 200) {
    		var epNewsHubdata = JSON.parse(body);
    		for (mep in epNewsHubdata){
    			if(meps[epNewsHubdata[mep].mep_codictId]){
    				if(epNewsHubdata[mep].mep_emailAddress !== ''){
    					meps[epNewsHubdata[mep].mep_codictId].email = epNewsHubdata[mep].mep_emailAddress;
    				}
    				if(epNewsHubdata[mep].mep_epPageUrl !== ''){
    					meps[epNewsHubdata[mep].mep_codictId].webPage = epNewsHubdata[mep].mep_epPageUrl;
    				}
    				if(epNewsHubdata[mep].mep_facebookPageUrl !== ''){
    					meps[epNewsHubdata[mep].mep_codictId].facebookPageUrl = epNewsHubdata[mep].mep_facebookPageUrl;
    				}
    				if(epNewsHubdata[mep].mep_facebookPageUrl !== ''){
    					meps[epNewsHubdata[mep].mep_codictId].facebookPageUrl = epNewsHubdata[mep].mep_facebookPageUrl;
    				}
    				if(epNewsHubdata[mep].mep_twitterUrl !== ''){
    					meps[epNewsHubdata[mep].mep_codictId].twitterUrl = epNewsHubdata[mep].mep_twitterUrl;
    				}
    				if(epNewsHubdata[mep].mep_additionalProperties !== ''){
    					var roles = JSON.parse(epNewsHubdata[mep].mep_additionalProperties);
    					meps[epNewsHubdata[mep].mep_codictId].roles = roles;
    				}
    			}
    		}
    		console.log(meps)
    	}
    })
}
});