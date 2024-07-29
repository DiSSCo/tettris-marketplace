/**
 * Function to create the licenses dropdown in the form, based upon the SPDX license list (Required)
 */
const CreateLicenseField = (form, name, required = false) => {
  const licenses = Licenses();

  /* Add list item to form */
  const listItem = form.addListItem();

  /* For each license, add a list item option */
  const listItemChoices = [];

  licenses.licenses.forEach(license => {
    /* Check if license is not deprecated */
    if (!license.isDeprecatedLicenseId) {
      listItemChoices.push(listItem.createChoice(license.name.replace(/(\r\n|\n|\r)/gm, "")));
    }
  });

  listItem.setChoices(listItemChoices);
  listItem.setTitle(name);
  listItem.setRequired(required);
};

/* Available Languages (Requires at least one) */
const CreateAvailableLanguagesField = (form) => {
  const textItem = form.addParagraphTextItem();

  textItem.setTitle('Available Languages');
  textItem.setHelpText('Use ISO alpha-3/ISO 639-2, separate by comma to define multiple');
  textItem.setRequired(true);
};

/* Version */
const CreateVersionField = (form) => {
  const textItem = form.addTextItem();

  textItem.setTitle('Version');
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
};

/* Taxonomic Range */
const CreateTaxonomicRangeField = (form) => {
  const textItem = form.addParagraphTextItem();

  textItem.setTitle('Taxonomic Range');
  textItem.setHelpText('Separate by comma to define multiple');
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
    multipleChoiceItem.setRequired(true);
  })();

  /* Name (Required) */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Name');
    textItem.setRequired(true);
  })();

  /* Description (Required) */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Description');
    textItem.setRequired(true);
  })();

  /* Slogan */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Slogan');
  })();

  /* Logo */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Logo');
  })();

  /* Date Modified */
  (() => {
    const textItem = form.addDateItem();

    textItem.setTitle('Date Modified');
  })();

  /* Terms of Service */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Terms of Service');
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

    textItem.setTitle('Identifier');
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
const CreateFundingSchemaSection = (form, index) => {
  const sectionHeader = form.addSectionHeaderItem();

  sectionHeader.setTitle('Funding');

  /* Payment Model */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Payment Model');
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
    textItem.setHelpText('Required when using the Software Source Code object');
  })();

  /* Change Log */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Change Log');
  })();

  /* Runtime Platform */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Runtime Platform');
  })();

  /* Status */
  (() => {
    const textItem = form.addTextItem();

    textItem.setTitle('Status');
  })();

  /* Programming Languages */
  (() => {
    const textItem = form.addParagraphTextItem();

    textItem.setTitle('Programming Languages');
    textItem.setHelpText('Separate by comma to define multiple');
  })();

  /* Software License */
  (() => {
    CreateLicenseField(form, 'Software License');
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
  })();

  /* Media License */
  (() => {
    CreateLicenseField(form, `Media License ${index}`);
  })();
};