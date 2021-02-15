// const _ = require('underscore');

// const aes256 = require('aes256');

// const check_required_fields = (actual_array, reference_array) => {
//     const common_keys = _.intersection(actual_array, reference_array);

//     // eslint-disable-next-line camelcase
//     if (common_keys.length === reference_array.length)
//         return true;


//     return false;
// };

// function encrypt (text, key) {
//     if (text && key)
//         return aes256.encrypt(key, text);

//     return '';
// }

// const decrypt = (text, key) => {
//     if (text && key)
//         return aes256.decrypt(key, text);

//     return '';
// };

// function json_parse (str) {
//     let json = {};

//     try {
//         json = JSON.parse(str);
//     } catch (e) {
//         return {};
//     }

//     return json;
// }

// const get_all_keys_of_json = (object, return_object) => {
//     const keys = Object.keys(object);

//     return_object = _.union(return_object, keys);
//     _.each(object, value => {
//         if (typeof value === 'object')
//             return_object = get_all_keys_of_json(value, return_object);
//     });

//     return return_object;
// };

// const convert_to_given_codes = (keys, short_long_code, convert_code_type, request_body, mapped_data) => {
//     _.each(request_body, (actualvalue, value) => {
//         if (typeof request_body[value] === 'object' && !(request_body[value] instanceof Array)) {
//             const returned_data = convert_to_given_codes(keys, short_long_code, convert_code_type, request_body[value], {});

//             Object.assign(returned_data.mapped_data, returned_data.request_body);
//             if (short_long_code[value])
//                 mapped_data[short_long_code[value][convert_code_type]] = returned_data.mapped_data;
//             else
//                 mapped_data[value] = returned_data.mapped_data;

//             delete request_body[value];
//         } else if (typeof request_body[value] === 'object' && request_body[value] instanceof Array) {
//             mapped_data[short_long_code[value][convert_code_type]] = [];
//             _.each(request_body[value], arrayValue => {
//                 const returned_data = convert_to_given_codes(keys, short_long_code, convert_code_type, arrayValue, {});

//                 Object.assign(returned_data.mapped_data, returned_data.request_body);
//                 if (short_long_code[value])
//                     mapped_data[short_long_code[value][convert_code_type]].push(returned_data.mapped_data);
//                 else
//                     mapped_data[value] = returned_data.mapped_data;

//                 delete request_body[value];
//             });
//         } else if (short_long_code[value] && short_long_code[value][convert_code_type]) {
//             mapped_data[short_long_code[value][convert_code_type]] = request_body[value];
//             delete request_body[value];
//         }
//     });

//     return { mapped_data, request_body };
// };

// module.exports = {
//     check_required_fields,
//     decrypt,
//     encrypt,
//     json_parse,
//     get_all_keys_of_json,
//     convert_to_given_codes,
// };
