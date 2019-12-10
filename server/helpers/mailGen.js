import sgMail from '@sendgrid/mail';
import Mailgen from 'mailgen';
import { config } from 'dotenv';

config();

const url = process.env.BASE_URL || 'localhost:3000';
const projectName = process.env.PROJECT_NAME || 'GTi';
const projectEmail = process.env.PROJECT_EMAIL || 'noreply@gti.com';
const fs = require('fs');
const path = require('path');

const dir1 = path.join(__dirname, '../assets/BANK_GUARANTEE.pdf');
// const dir2 = path.join(__dirname, '../assets/AUTHORITY_TO_COLLECT.pdf');

const dataBuffer = fs.readFileSync(dir1).toString('base64');


// const dataBuffer2 = fs.readFileSync(dir2).toString('base64');

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

const sendMailWithoutAttachment = ({
  to, subject, message
}) => {
  const mailOptions = {
    from: `${projectName} <${projectEmail}>`,
    to,
    subject,
    html: message
  };

  sgMail.send(mailOptions);
};

const sendOrderPlaced = (email, order, name) => {
  const emailBody = {
    body: {
      name,
      intro: `Dear ${name}, An order has been placed. Please find below the details of your order ${order.id}. `,
      table: {
        data: [
          {
            item: `${order.product}`,
            quantity: `${order.quantity}`,
            price: `${order.unitprice}`
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
        instructions: 'Click on the button below to view the full summary of your order.',
        button: {
          color: '#1a82e2',
          text: 'View Order Summary',
          // link: `${url}/auth/activate_user?email=${email}&token=${token}`
        }
      },
      outro: 'If that doesn\'t work, copy and paste the following link in your browser:'
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMailWithoutAttachment({
    to: email,
    subject: `${projectName}: Order ${order.id} Placed`,
    message
  });
};


const sendBankGuarantee = (email, order, name) => {
  const emailBody = {
    body: {
      product: {
        name: 'BANK GUARANTEE',
        link: 'http://example.com',
      },
      name,
      intro: `Please find below the approved bank guarantee for order #${order.id}. `,
      table: {
        data: [
          {
            distributor: `${order.distname}`,
            amount: `${order.total}`,
            item: `${order.product}`,
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
      outro: 'Kindly log in to the application to view the full order summary.'
    }
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


const sendBankGuaranteeStatus = (email, status, id, name) => {
  const emailBody = {
    body: {
      product: {
        name: 'BANK GUARANTEE',
        link: 'http://example.com',
      },
      name,
      intro: `Dear ${name}, Please be informed that the bank guarantee for order #${id} has been ${status}. `,
      outro: 'Kindly log in to the application to view the full order summary.'
    }
  };
    // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMailWithoutAttachment({
    to: email,
    subject: `${projectName}: Bank Guarantee Status`,
    message
  });
};

const distrSignupMail = (email, name) => {
  const emailBody = {
    body: {
      product: {
        name: 'GTi',
        link: 'http://example.com',
      },
      name,
      intro: 'Please be informed that you signed up on GTi with this email',
      outro: 'Kindly log in to the application to initiate a transaction.'
    }
  };
    // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMailWithoutAttachment({
    to: email,
    subject: `${projectName}: GTi`,
    message
  });
};

const sendATC = (email, order, name) => {
  const emailBody = {
    body: {
      product: {
        name: 'AUTHORITY TO COLLECT',
        link: 'http://example.com',
      },
      name,
      intro: `Dear ${name}, Please find below the issued Authority to Collect for order #${order.id}. `,
      columns: {
        // Optionally, customize the column widths
        customWidth: {
          item: '20%',
          price: '15%'
        },
        // Optionally, change  column text alignment
        customAlignment: {
          price: 'right'
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
    }
  };
    // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);
  return sendMail({
    to: email,
    subject: `${projectName}: Authority To Collect`,
    attachments: [
      {
        content: dataBuffer,
        filename: 'authority_to_collect.pdf',
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ],
    message
  });
};

const sendForgotPasswordMail = (token, email, name) => {
  const link = `${url}/auth/reset_password?email=${email}&token=${token}`;
  const emailBody = {
    body: {
      name,
      intro: 'You are receiving this email because a password reset request for your account was received.',
      action: {
        instructions: 'Tap the button below to reset your customer account password. If you didn\'t request a new password, you can safely delete this email.',
        button: {
          color: '#1a82e2',
          text: 'Reset Your Password',
          link
        }
      },
      outro: `If that doesn't work, copy and paste the following link in your browser:\n\n${link}`
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMailWithoutAttachment({
    to: email,
    subject: `${projectName}: Forgot Password`,
    message
  });
};

const sendResetSuccessMail = (email, name) => {
  const emailBody = {
    body: {
      name,
      intro: 'You are receiving this email because a password reset request for your account was received.',
      action: {
        instructions: `Your password has been successfully reset. Please login to ${projectName} by clicking the button below`,
        button: {
          color: 'green',
          text: 'Login',
          link: `${url}/login`
        }
      }
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMailWithoutAttachment({
    to: email,
    subject: `${projectName}: Reset Success`,
    message
  });
};

export {
  sendForgotPasswordMail,
  sendResetSuccessMail,
  sendOrderPlaced,
  sendATC,
  sendBankGuarantee,
  sendBankGuaranteeStatus,
  distrSignupMail
};
