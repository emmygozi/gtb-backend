const sgMail = require('@sendgrid/mail');
const Mailgen = require('mailgen');
const { config } = require('dotenv');

config();

const url = process.env.BASE_URL || 'localhost:3000';
const projectName = process.env.PROJECT_NAME || 'GTi';
const projectEmail = process.env.PROJECT_EMAIL || 'deriinoguntade@gmail.com';
const fs = require('fs');
const path = require('path');

const dir1 = path.join(__dirname, '../assets/BANK_GUARANTEE.pdf');
// const dir2 = path.join(__dirname, '../assets/AUTHORITY_TO_COLLECT.pdf');

const dataBuffer = fs.readFileSync(dir1).toString('base64');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configure the mail gen
const mailGenerator = new Mailgen({
  theme: 'cerberus',
  product: {
    name: projectName,
    link: url
  }
});

const sendMail = ({
  to, subject, attachments, message
}) => {
  const mailOptions = {
    from: `${projectName} <${projectEmail}>`,
    to,
    subject,
    attachments,
    html: message
  };

  sgMail.send(mailOptions);
};

const sendBankGuarantee = (email, order, name) => {
  const emailBody = {
    body: {
      product: {
        name: 'BANK GUARANTEE',
        link: 'http://example.com',
      },
      name,
      intro: `Dear ${name}, Please find below the approved bank guarantee for order #${order.id}. `,
      table: {
        data: [
          {
            distributor: `${order.name}`,
            total: `${order.total}`,
            item: `${order.item}`,
            quantity: `${order.quantity}`,
            price: `${order.price}`
          }
        ],
        columns: {
          // Optionally, customize the column widths
          customWidth: {
            item: '20%',
            price: '15%'
          },
          // Optionally, change column text alignment
          customAlignment: {
            price: 'right'
          }
        }
      },
      action: {
        instructions: 'Click on the button below to view the full summary of the order.',
        button: {
          color: '#1a82e2',
          text: 'View Order Summary',
          // link: `${url}/auth/activate_user?email=${email}&token=${token}`
        }
      },
      outro: 'If that doesn\'t work, copy and paste the following link in your browser:'
    },
  };
    // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMail({
    to: email,
    subject: `${projectName}: Bank Guarantee`,
    attachments: [
      {
        content: dataBuffer,
        filename: 'bank_guarantee.pdf',
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ],
    message
  });
};
// email, order, name
/* distributor: `${order.name}`,
amount: `${order.amount}`,
item: `${order.name}`,
quantity: `${order.quantity}`,
price: `${order.price}`
} */
const order = {
  name: 'D&O Distributor',
  total: 10000000,
  item: 'cement',
  quantity: 134,
  price: 300000
};
sendBankGuarantee('emmygozi2@gmail.com', order, 'Emmanuel');
