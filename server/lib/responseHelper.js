/**
 * RESPONSE HELPER
 * Funkcije za konzistentne API odgovore
 */

const responseHelper = {
  /**
   * Uspešan odgovor
   */
  success(res, data, message = 'Uspešno', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  /**
   * Greška odgovor
   */
  error(res, message = 'Greška', statusCode = 500, error = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      error: error ? error.message : null,
    });
  },

  /**
   * Validaciona greška
   */
  validationError(res, errors) {
    return res.status(400).json({
      success: false,
      message: 'Validaciona greška',
      errors,
    });
  },

  /**
   * Nije pronađeno
   */
  notFound(res, message = 'Resurs nije pronađen') {
    return res.status(404).json({
      success: false,
      message,
    });
  },

  /**
   * Neautorizovano
   */
  unauthorized(res, message = 'Neautorizovan pristup') {
    return res.status(401).json({
      success: false,
      message,
    });
  },
};

module.exports = responseHelper;
