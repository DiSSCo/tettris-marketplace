/**
 * Function to create the licenses dropdown in the form, based upon the SPDX license list (Required)
 */
const CreateLicenseField = (form, name, helpText, section) => {
  const licenses = Licenses();

  /* Add list item to form */
  const listItem = form.addListItem();

  /* For each license, add a list item option */
  const listItemChoices = [];

  licenses.licenses.forEach(license => {
    /* Check if license is not deprecated */
    if (!license.isDeprecatedLicenseId) {
      if (section === 'service') {
        if (license.name.includes('Creative')) {
          listItemChoices.unshift(listItem.createChoice(license.name.replace(/(\r\n|\n|\r)/gm, "")));
        } else {
          listItemChoices.push(listItem.createChoice(license.name.replace(/(\r\n|\n|\r)/gm, "")));
        }
      } else if (section === 'software') {
        if (license.name.includes('Apache') || license.name.includes('MIT') || license.name.includes('GPL')) {
          listItemChoices.unshift(listItem.createChoice(license.name.replace(/(\r\n|\n|\r)/gm, "")));
        } else {
          listItemChoices.push(listItem.createChoice(license.name.replace(/(\r\n|\n|\r)/gm, "")));
        }
      } else {
        listItemChoices.push(listItem.createChoice(license.name.replace(/(\r\n|\n|\r)/gm, "")));
      }
    }
  });

  listItem.setChoices(listItemChoices);
  listItem.setTitle(name);
  listItem.setHelpText(helpText);
};

/* Available Languages (Requires at least one) */
const CreateAvailableLanguagesField = (form) => {
  const textItem = form.addParagraphTextItem();

  textItem.setTitle('Available Languages');
  textItem.setHelpText('Use ISO alpha-3/ISO 639-2, separate by comma to define multiple.');
  textItem.setRequired(true);
};

/* Version */
const CreateVersionField = (form) => {
  const textItem = form.addTextItem();

  textItem.setTitle('Version');
  textItem.setHelpText('Current version of the resource, for example V1.0.0.');
};

/* Topic Discipline */
const CreateTopicDisciplineField = (form) => {
  const multipleChoiceItem = form.addMultipleChoiceItem();

  const choices = [
    "Anthropology",
    "Botany",
    "Astrogeology",
    "Geology",
    "Microbiology",
    "Palaeontology",
    "Zoology",
    "Ecology",
    "Other Biodiversity",
    "Other Geodiversity",
    "Unclassified"
  ];

  multipleChoiceItem.setChoices(choices.map(choice => multipleChoiceItem.createChoice(choice)));

  multipleChoiceItem.setTitle('Topic Discipline');
  multipleChoiceItem.setHelpText('For resources that are not discipline specific use "Unclassified"');
};

/* Taxonomic Range */
const CreateTaxonomicRangeField = (form) => {
  const textItem = form.addParagraphTextItem();

  textItem.setTitle('Taxonomic Range');
  textItem.setHelpText('e.g. Bees,  Agromyzidae, Braconidae subfamilies. Separate by comma to define multiple.');
};

/* Geographic Area */
const CreateGeographicAreaField = (form) => {
  const textItem = form.addTextItem();

  textItem.setTitle('Geographic Area');
  textItem.setHelpText('e.g. Palearctic, South-East Europe, Mediterranean.  Separate by comma to define multiple.');
};

/* Documentation URL */
const CreateDocumentationURLField = (form) => {
  const textItem = form.addTextItem();

  textItem.setTitle('Documentation URL');
};

/* Service */
const CreateServiceSection = (form) => {
  const sectionHeader = form.addSectionHeaderItem();

  sectionHeader.setTitle('Service Information');

  /* Service Type (Required) */
  (() => {
    const multipleChoiceItem = form.addMultipleChoiceItem();

    const choices = [
      'AITrainingDataset',
      'communityGroup',
      'crowdSourcing',
      'dataTool',
      'e-LearningService',
      'factsheet',
      'identification',
      'inventory',
      'referenceCollection',
      'specimenDatasetNotInGBIF',
      'website'
    ];

    multipleChoiceItem.setChoices(choices.map(choice => multipleChoiceItem.createChoice(choice)));

    multipleChoiceItem.setTitle('Service Type');
    multipleChoiceItem.setHelpText('The type of service. Use "inventory" for a catalog or inventory of resources such as a web page listing a number of identification keys made with a certain software package.');
    multipleChoiceItem.setRequired(true);
  })();

  /* Name (Required) */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Name');
    textItem.setRequired(true);
    textItem.setHelpText('Name of the e-service or tool (max 50 chars)');
  })();

  /* Description (Required) */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Description');
    textItem.setRequired(true);
    textItem.setHelpText('A one or two paragraph description of the service in English.');
  })();

  /* Slogan */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Slogan');
    textItem.setHelpText('Short catchphrase for marketing and advertising purposes. It should refer to the main value or purpose of the resource.');
  })();

  /* Logo */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Logo');
    textItem.setHelpText('URL to a logo of the resource in JPG or PNG format.');
  })();

  /* Date Modified */
  (() => {
    const textItem = form.addDateItem();

    textItem.setTitle('Date Modified');
    textItem.setHelpText('Date when the resource was last updated.');
  })();

  /* Terms of Service */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Terms of Service');
    textItem.setHelpText('URL to terms of service documentation');
  })();
};

/* Contact Point */
const CreateContactPointSection = (form) => {
  const sectionHeader = form.addSectionHeaderItem();

  sectionHeader.setTitle('Contact Point');

  /* Contact Email */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Contact Email');
  })();

  /* Contact Webpage */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Contact Webpage');
    textItem.setHelpText('URL to a webpage for the resource.');
  })();

  /* Webpage */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Webpage');
  })();
};

/* Maintainer */
const CreateMaintainerSection = (form, index) => {
  const sectionHeader = form.addSectionHeaderItem();

  sectionHeader.setTitle(`Maintainer #${index}`);

  /* Identifier */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Identifier of Maintainer');
    textItem.setHelpText('An identifier such as GitHub ID or ORCID.');
  })();

  /* Full Name */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Full Name');
  })();

  /* Organisation identifier (ROR) */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Organisation Identifier');
    textItem.setHelpText('Use a ROR identifier');
  })();

  /* Organisation Legal Name */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Organisation Legal Name');
  })();
};

/* Funding Schema */
const CreateFundingSchemaSection = (form) => {
  const sectionHeader = form.addSectionHeaderItem();

  sectionHeader.setTitle('Funding');

  /* Payment Model */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Payment Model');
    textItem.setHelpText('One of:  License-Based payment, Usage-Based payment,, Freemium, Open Source, Ad-Based,  Value-Based or Voluntary payment, Hybrid model');
  })();

  /* Funder Name */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Funder Name');
  })();
};

/* Software Source Code */
const CreateSoftwareSourceCodeSection = (form) => {
  const sectionHeader = form.addSectionHeaderItem();

  sectionHeader.setTitle('Software Source Code');

  /* Code Repository */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Code Repository');
    textItem.setHelpText('Link to the repository where the un-compiled, human readable code and related code is located (SVN, GitHub, CodePlex).');
  })();

  /* Change Log */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Change Log');
    textItem.setHelpText('The subject matter of the content including a summary of the Resource features updated from the previous version.');
  })();

  /* Runtime Platform */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Runtime Platform');
    textItem.setHelpText('Runtime platform or script interpreter dependencies (example: Java v1, Python 2.3, .NET Framework 3.0).');
  })();

  /* Status */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Status');
    textItem.setHelpText('Status in terms of its stage in a lifecycle. For example: Beta, Production, Unmaintained, Discontinued.');
  })();

  /* Programming Languages */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Programming Languages');
  })();

  /* Software License */
  (() => {
    CreateLicenseField(form, 'Software License', 'Depending on the resource type a licence for resource software.', 'software');
  })();
};

/* Associated Media */
const CreateAssociatedMediaSection = (form, index) => {
  const sectionHeader = form.addSectionHeaderItem();

  sectionHeader.setTitle(`Associated Media #${index}`);

  /* Content URL */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Content URL');
    textItem.setHelpText('URL to a JPG or PNG file showing a screenshot or other relevant illustration of the resource.');
  })();

  /* Media License */
  (() => {
    CreateLicenseField(form, `Media License ${index}`);
  })();
};