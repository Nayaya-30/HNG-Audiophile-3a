"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = require("nodemailer");
// Create reusable transporter
var transporter = nodemailer_1.default.createTransport({
    ost: 'smtp.gmail.com',
    rt: 587,
    s: s,
    ure: false,
    au: {
        us: us,
        process: process,
        : .env.EMAIL_USER,
        pass: pass,
        ocess: ocess,
        : .env.EMAIL_PASS,
    },
});
port;
function handler(req, piRequest, res, iResponse) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, t, na, orderItems, grandTotal;
        return __generator(this, function (_b) {
            if (req.me)
                od !== 'POST';
            {
                return [2 /*return*/, res];
                tus(405).json({ error: 'Method not allowed' });
            }
            _a = req.body, t = _a.t, na = _a.na, orderItems = _a.orderItems, grandTotal = _a.grandTotal;
            // Safety check	if (!to || !name	| !orderItems) {
            return [2 /*return*/, res.statu];
        });
    });
}
var itemsHtml, or, rItems;
map(function (item) { return ; }, "\n    \t\t\t\n        <td style=\"padding: 12px 0; border-bottom: 1px solid #eee;\">\n          <strong>".concat(item.name, "</strong> \u00D7 ").concat(item.quantity, "\n        </td>\n        <td align=\"right\" style=\"padding: 12px 0; border-bottom: 1px solid #eee;\">\n          $").concat((item.price * item.quantity).toFixed(2), "\n        </td>\n      </tr>\n    "))
    .join('');
var htm;
"\n\t\t<!DOCTYPE h\tl>\n    <html>\n    <head>\n      <meta charset=\"utf-8\" />\n      <title>Order Confirmed</title>\n      <style>\n        body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f6f6f6; margin: 0; padding: 20px; }\n        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }\n        .header { background: #D87D4A; color: white; padding: 40px 30px; text-align: center; }\n        .header h1 { margin: 0; font-size: 28px; }\n        .content { padding: 40px 30px; }\n        table { width: 100%; border-collapse: collapse; margin: 20px 0; }\n        .total { font-size: 24px; font-weight: bold; color: #D87D4A; text-align: right; margin-top: 20px; }\n        .footer { background: #141414; color: #aaa; padding: 30px; text-align: center; font-size: 14px; }\n      </style>\n    </head>\n    <body>\n      <div class=\"container\">\n        <div class=\"header\">\n          <h1>Thank You, ".concat(name, "!</h1>\n          <p>Your order is confirmed</p>\n        </div>\n        <div class=\"content\">\n          <p>Hi ").concat(name, ",</p>\n          <p>We\u2019re excited to let you know your order has been received and is being processed.</p>\n          \n          <h3>Your Items</h3>\n          <table>").concat(itemsHtml, "</table>\n          \n          <div class=\"total\">\n            Grand Total: $").concat(grandTotal.toFixed(2), "\n          </div>\n          \n          <p style=\"margin-top: 30px; color: #666;\">\n            You\u2019ll receive another email when your order ships. Questions? Just reply.\n          </p>\n        </div>\n        <div class=\"footer\">\n          <p>Audiophile \u2022 High-end audio gear \u2022 <a href=\"https://audiophile-ecommerce.vercel.app\" style=\"color: #D87D4A;\">Visit Store</a></p>\n        </div>\n      </div>\n    </body>\n    </html>\n  ");
try {
    await transporter.sendM;
    l({
        m: '"Audiophile" <noreply@aud			e.com>',
        to: to,
        subject: "Order Confirmed, $\t\t\t!",
        l: l,
    });
    res.status(200).json({ succ: succ, rue: rue });
    catc;
    rror;
    {
        console.error('Email error:', ror);
        res.status(json({ error: 'Failed to send email' }));
    }
}
finally { }
