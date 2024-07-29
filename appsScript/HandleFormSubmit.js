const fieldNameResolutionDict = {
  "Service Licence": 'schema:license',
  "Available Languages": 'schema:availableLanguage',
  Version: 'schema:version',
  "Topic Discipline": "ods:topicDiscipline",
  "Taxonomic Range": 'schema:taxonomicRange',
  "Documentation URL": "schema:documentation",
  "Service Type": 'schema:serviceType',
  Name: 'schema:name',
  Description: 'schema:description',
  Slogan: 'schema:slogan',
  Logo: 'schema:logo',
  "Date Modified": 'schema:dateModified',
  "Terms of Service": 'schema:termsOfService',
  "Contact Email": 'schema:email',
  "Contact Webpage": 'schema:url',
  "Webpage": 'schema:sameAs',
  "Identifier": "schema:identifier",
  "Full Name": "schema:name",
  "Organisation Identifier": "schema:identifier",
  "Organisation Legal Name": "schema:legalName",
  "Payment Model": 'schema:url',
  "Funder Name": 'schema:name',
  "Code Repository": 'schema:codeRepository',
  "Change Log": 'schema:about',
  "Runtime Platform": 'schema:runtimePlatform',
  Status: 'schema:creativeWorkStatus',
  "Programming Languages": 'schema:programmingLanguage',
  "Software License": "schema:license",
  "Content URL": "schema:contentUrl",
  "Media License": "schema:license"
};
const licences = Licenses();

/**
 * Function to return the schema name for a field, when provided with the name of the field in the form
 */
const ReferenceField = (fieldName) => {
  return fieldNameResolutionDict[fieldName];
};

/**
 * Function to add a value to the taxonomic service object
 */
const AddToTaxonomicService = (taxonomicService, itemTitle, itemResponse) => {
  if (itemResponse) {
    switch (itemTitle) {
      case 'Languages':
      case 'Taxonomic Scope':
        /* For each item separated by comma in string, push to array */
        taxonomicService[ReferenceField(itemTitle)] = itemResponse.split(',').map(item => item.replace(' ', ''));

        break;
      case 'Source URL':
        if (itemResponse) {
          taxonomicService['cetaf:Software'] = {
            [`${ReferenceField(itemTitle)}`]: itemResponse
          };
        };

        break;
      case 'Required Resources':
      case 'Programming Languages':
        if ('cetaf:Software' in taxonomicService) {
          taxonomicService['cetaf:Software'][ReferenceField(itemTitle)] = itemResponse.split(',').map(item => item.replace(' ', ''));
        };

        break;
      case 'Deprecated':
      case 'Change Log':
        if ('cetaf:Software' in taxonomicService) {
          taxonomicService['cetaf:Software'][ReferenceField(itemTitle)] = itemResponse;
        };

        break;
      case 'Licence':
        taxonomicService[ReferenceField(itemTitle)] = licences.licenses.find(licence => licence.name === itemResponse).licenseId;

        break;
      default:
        taxonomicService[ReferenceField(itemTitle)] = itemResponse;
    };
  };
};

/**
 * Function for handling a form submit
 */
const HandleFormSubmit = (e) => {
  /* Base variables */
  const taxonomicService = {
    type: 'TaxonomicService',
    attributes: {
      content: {
        taxonomicService: {
          '@type': 'taxonomicService',
          'cetaf:state': 'draft',
          'cetaf:qualityScore': 0,
          'cetaf:hasAgent': [
            {
              'cetaf:agentID': 'https://orcid.org/0000-0000-0000-0000'
            }
          ]
        }
      }
    }
  };
  const itemResponses = e.response.getItemResponses();
  let message = 'A new application has been submitted, the data:\n \n';

  for (var i = 0; i < itemResponses.length; i++) {
    const itemTitle = itemResponses[i].getItem().getTitle();
    const itemResponse = itemResponses[i].getResponse();

    /* Add response item to taxonomic service */
    AddToTaxonomicService(taxonomicService.attributes.content.taxonomicService, itemTitle, itemResponse);

    /* Add response item to message */
    message += itemTitle + ': ' + itemResponse + '\n';
  };

  /* POST submission as a draft record to Cordra */
  const url = "https://cetaf-marketplace.dissco.tech/cordra/doip/0.DOIP/Op.Create?targetId=service";
  const options = {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Utilities.base64Encode("GoogleForms" + ":" + "J6ts896bNRKw")
    },
    contentType: 'application/json',
    payload: JSON.stringify(taxonomicService)
  };

  UrlFetchApp.fetch(url, options);

  /* Send email to CETAF admins */
  MailApp.sendEmail(
    Session.getEffectiveUser().getEmail()/*info@cetaf.org*/,
    'New Taxonomic Service Application Received',
    JSON.stringify(taxonomicService),
    { name: 'Google Forms' });
};
