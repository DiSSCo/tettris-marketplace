const fieldNameResolutionDict = {
  "Service License": 'schema:license',
  "Available Languages": 'schema:availableLanguage',
  Version: 'schema:version',
  "Topic Discipline": "ods:topicDiscipline",
  "Taxonomic Range": 'schema:taxonomicRange',
  "Geographic Area": "schema:geographicArea",
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
  "Identifier of Maintainer": "schema:identifier",
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
  "Media License 1": "schema:license",
  "Media License 2": "schema:license",
  "Media License 3": "schema:license",
};
const licences = Licenses();
let maintainerIndex = 0;
let associatedMediaIndex = 0;

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
  let index = 0;
  let visibleIndex = 0;

  switch (itemTitle) {
    case 'Available Languages':
    case 'Taxonomic Range':
      /* For each item separated by comma in string, push to array */
      taxonomicService[ReferenceField(itemTitle)] = itemResponse.split(',').map(item => item.replace(' ', ''));

      break;
    case 'Service Type':
    case 'Name':
    case 'Description':
    case 'Slogan':
    case 'Logo':
    case 'Date Modified':
    case 'Terms of Service':
      taxonomicService['schema:Service'][ReferenceField(itemTitle)] = itemResponse;

      break;
    case 'Contact Email':
    case 'Contact Webpage':
    case 'Webpage':
      /* Check if contact point disctionary exists, else add */
      if (!('schema:ContactPoin' in taxonomicService)) {
        taxonomicService['schema:ContactPoint'] = {};
      }

      taxonomicService['schema:ContactPoint'][ReferenceField(itemTitle)] = itemResponse;

      break;
    case 'Identifier of Maintainer 1':
    case 'Identifier of Maintainer 2':
    case 'Identifier of Maintainer 3':
    case 'Full Name 1':
    case 'Full Name 2':
    case 'Full Name 3':
    case 'Organisation Identifier 1':
    case 'Organisation Identifier 2':
    case 'Organisation Identifier 3':
    case 'Organisation Legal Name 1':
    case 'Organisation Legal Name 2':
    case 'Organisation Legal Name 3':
      /* Get index from item title */
      index = Number(itemTitle.slice(-1)) - 1;
      visibleIndex = index + 1;

      /* Check if maintainer object exists, otherwise create it first */
      if (!taxonomicService['schema:Maintainer']) {
        taxonomicService['schema:Maintainer'] = [
          {
            'schema:identifier': ''
          }
        ];
      } else if (!taxonomicService['schema:Maintainer'][index]) {
        taxonomicService['schema:Maintainer'][index] = {
          'schema:identifier': ''
        };
      }

      if (itemTitle.includes('Organisation')) {
        if (!taxonomicService['schema:Maintainer'][index]['schema:Organization']) {
          taxonomicService['schema:Maintainer'][index]['schema:Organization'] = {
            [ReferenceField(itemTitle.replace(` ${visibleIndex}`, ''))]: itemResponse
          };
        } else {
          taxonomicService['schema:Maintainer'][index]['schema:Organization'][ReferenceField(itemTitle.replace(` ${visibleIndex}`, ''))] = itemResponse;
        }
      } else {
        taxonomicService['schema:Maintainer'][index][ReferenceField(itemTitle.replace(` ${visibleIndex}`, ''))] = itemResponse;
      }

      break;
    case 'Payment Model':
    case 'Funder Name':
      /* Check if funder dictionary is present */
      if (!('schema:FundingScheme' in taxonomicService)) {
        taxonomicService['schema:FundingScheme'] = {};
      }

      if (itemTitle === 'Funder Name') {
        taxonomicService['schema:FundingScheme']['schema:Funder'] = {
          [ReferenceField(itemTitle)]: itemResponse
        };
      } else {
        taxonomicService['schema:FundingScheme'][ReferenceField(itemTitle)] = itemResponse;
      };

      break;
    case 'Code Repository':
      taxonomicService['schema:SoftwareSourceCode'] = {
        [`${ReferenceField(itemTitle)}`]: itemResponse
      };

      break;
    case 'Programming Languages':
    case 'Change Log':
    case 'Runtime Platform':
    case 'Status':
      if ('schema:SoftwareSourceCode' in taxonomicService) {
        taxonomicService['schema:SoftwareSourceCode'][ReferenceField(itemTitle)] = itemResponse;
      };

      break;
    case 'Software License':
      taxonomicService['schema:SoftwareSourceCode'][ReferenceField(itemTitle)] = licences.licenses.find(licence => licence.name === itemResponse).licenseId;

      break;
    case 'Content URL 1':
    case 'Content URL 2':
    case 'Content URL 3':
    case 'Media License 1':
    case 'Media License 2':
    case 'Media License 3':
      /* Get index from item title */
      index = Number(itemTitle.slice(-1)) - 1;
      visibleIndex = index + 1;

      /* Check if associated media object exists, otherwise create it first */
      if (!taxonomicService['schema:AssociatedMedia']) {
        taxonomicService['schema:AssociatedMedia'] = [
          {
            'schema:contentUrl': ''
          }
        ];
      } else if (!taxonomicService['schema:AssociatedMedia'][index]) {
        taxonomicService['schema:AssociatedMedia'][index] = {
          'schema:contentUrl': ''
        };
      }

      if (itemTitle.includes('Media License')) {
        taxonomicService['schema:AssociatedMedia'][index][`${ReferenceField(itemTitle.replace(` ${visibleIndex}`, ''))}`] = licences.licenses.find(licence => licence.name === itemResponse).licenseId;
      } else {
        taxonomicService['schema:AssociatedMedia'][index][`${ReferenceField(itemTitle.replace(` ${visibleIndex}`, ''))}`] = itemResponse;
      }

      break;
    case 'Service License':
      taxonomicService[ReferenceField(itemTitle)] = licences.licenses.find(licence => licence.name === itemResponse).licenseId;

      break;
    default:
      taxonomicService[ReferenceField(itemTitle)] = itemResponse;
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
          '@type': 'TaxonomicService',
          'schema:status': 'proposed',
          'schema:ratingValue': 0,
          'schema:Service': {}
        }
      }
    }
  };
  const itemResponses = e.response.getItemResponses();
  let message = 'A new application has been submitted, the data:\n \n';

  itemResponses.forEach((itemResponsesRecord, i) => {
    const itemTitle = itemResponsesRecord.getItem().getTitle();
    const itemResponse = itemResponsesRecord.getResponse();

    /* Add response item to taxonomic service */
    if (itemResponse && itemTitle) {
      AddToTaxonomicService(taxonomicService.attributes.content.taxonomicService, itemTitle, itemResponse);

      /* Add response item to message */
      message += itemTitle + ': ' + itemResponse + '\n';
    }
  });

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