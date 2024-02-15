import sequelize from '../../../../db/index.js';
import OtpVerification from '../models/index.js';
import Organization from '../../../v2/organization/models/index.js';
import {
  getRandom6DigitNumber,
  expiresAtTime,
  sendOtp,
} from '../helpers/index.js';

const generateOtp = async (req, res) => {
  try {
    if (req.body.mobileNumber) {
      const { organizationname } = req.params;
      await OtpVerification.sync();
      if (organizationname) {
        const registeredOrganization = await Organization.findOne({
          where: {
            store: organizationname,
          },
        });

        if (registeredOrganization) {
          if (req.body.mobileNumber.length === 10) {
            const isAlreadyRequest = await OtpVerification.findOne({
              where: {
                mobileNumber: req.body.mobileNumber,
                store: registeredOrganization.store,
              },
            });

            const otp = getRandom6DigitNumber();
            const expiresAt = expiresAtTime();

            if (isAlreadyRequest === null) {
              const savedData = await OtpVerification.create({
                mobileNumber: req.body.mobileNumber,
                otp: otp,
                store: organizationname,
                expiresAt: expiresAt,
              });

              if (savedData) {
                const response = await sendOtp(
                  otp,
                  registeredOrganization,
                  req.body.mobileNumber
                );
                res.status(200).send({
                  success: true,
                  message: 'OTP Sent successfully',
                  expiresAt: expiresAt,
                });
              } else {
                res.status(400).send({
                  success: false,
                  message: 'Error in sending otp',
                });
              }
            } else {
              const updateOtp = await OtpVerification.update(
                {
                  otp: otp,
                  expiresAt: expiresAt,
                },
                {
                  where: {
                    id: isAlreadyRequest.id,
                  },
                }
              );

              if (updateOtp) {
                const response = await sendOtp(
                  otp,
                  registeredOrganization,
                  req.body.mobileNumber
                );
                res.status(200).send({
                  success: true,
                  message: 'OTP Sent successfully',
                  expiresAt: expiresAt,
                });
              } else {
                res.status(400).send({
                  success: false,
                  message: 'Error in sending otp',
                });
              }
            }
          } else {
            res.status(400).send({
              success: false,
              message: 'Mobile Number is invalid',
            });
          }
        } else {
          res.status(400).send({
            success: false,
            message: 'Organization is not registered',
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'Organization Name is required',
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: 'Mobile Number is required',
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    const { organizationname } = req.params;
    if (organizationname) {
      const registeredOrganization = await Organization.findOne({
        where: {
          store: organizationname,
        },
      });

      if (registeredOrganization) {
        if (mobileNumber && otp) {
          const isAuthenticated = await OtpVerification.findOne({
            where: {
              mobileNumber: mobileNumber,
              otp: otp,
              store: registeredOrganization.store,
            },
          });

          if (isAuthenticated !== null) {
            const currentDate = new Date();
            const tillValid = new Date(isAuthenticated.expiresAt);
            const isValid = currentDate > tillValid ? false : true;
            if (isValid) {
              res.status(200).send({
                success: true,
                userverified: true,
                message: 'OTP Verified',
              });
            } else {
              res.status(404).send({
                success: false,
                userverified: false,
                message: 'OTP Expired',
              });
            }
          } else {
            res.status(200).send({
              success: false,
              message: 'Wrong OTP',
            });
          }
        } else {
          res.status(400).send({
            success: false,
            message: 'Mobile Number and OTP are required',
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'Organization is not registered',
        });
      }
    } else {
      res.status(404).send({
        success: false,
        message: 'Organization Name is required',
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export { generateOtp, verifyOtp };
