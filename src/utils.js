import Airtable from "airtable";
import FormData from "form-data";
import Mailgun from "mailgun.js";
import Params from "./params";
const {
  apiKey,
  myBase,
  campaignPhrase,
  usersPhrase,
  API_KEY_SEND_EMAIL,
  DOMAIN_SEND_EMAIL,
} = Params;
const base = new Airtable({apiKey}).base(myBase);
const mailgun = new Mailgun(FormData);

const sendMgEmail = (from, users, subject, textWithoutGreetings) => {
  const mg = mailgun.client({username: "api", key: API_KEY_SEND_EMAIL});
 
  if (users) {
    users.map((user) => {
      const {Name, Email} = user.fields;
      const text = `Hello,  ${Name} ` + textWithoutGreetings;
      return mg.messages
        .create(DOMAIN_SEND_EMAIL, {
          from,
          to: Email,
          subject,
          text,
        })
        .then((msg) => console.log(msg))
        .catch((err) => console.error(err));
    });
  } else {
    console.log("uuups you have no users to send an email");
  }
};

const addUser = (name, email) => {
  base(usersPhrase).create(
    {
      Name: name,
      Email: email,
      Date: new Date().toDateString(),
    },
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

const updateRecordSended = (record) => {
  base(campaignPhrase).update(
    [
      {
        id: record[0].id,
        fields: {
          sended: true,
        },
      },
    ],
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

const updateRecordEmailDetail = (record, subject, content) => {
  if (record === undefined) {
    base(campaignPhrase).create(
      [
        {
          fields: {
            subject,
            content,
          },
        },
      ],
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  } else {
    base(campaignPhrase).update(
      [
        {
          id: record[0].id,
          fields: {
            subject,
            content,
          },
        },
      ],
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }
};

const submitCampaign = (subject, content, record) => {
  if (record === undefined) {
    base(campaignPhrase).create(
      [
        {
          fields: {
            subject,
            content,
            sended: true,
          },
        },
      ],
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  } else {
    base(campaignPhrase).update(
      [
        {
          id: record[0].id,
          fields: {
            subject,
            content,
            sended: true,
          },
        },
      ],
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }
};
const deleteCampaign = (record) => {
  base(campaignPhrase).destroy([record[0].id], function (err, deletedRecords) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Usunieto kampanie");
  });
};

export {
  sendMgEmail,
  updateRecordSended,
  updateRecordEmailDetail,
  submitCampaign,
  deleteCampaign,
  addUser,
};
