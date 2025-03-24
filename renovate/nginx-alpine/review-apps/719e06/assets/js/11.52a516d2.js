(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{302:function(t,e,a){"use strict";a.r(e);var s=a(4),i=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"callbacks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#callbacks"}},[t._v("#")]),t._v(" Callbacks")]),t._v(" "),e("p",[t._v("Callbacks can automate the production of a delivery receipt or persist the status of a notification to your database.")]),t._v(" "),e("p",[t._v("A callback lets you receive messages about the state of notifications from GC Notify to a URL you choose. Callbacks are when GC Notify sends "),e("code",[t._v("POST")]),t._v(" requests to your system. You can get callbacks when an email or text message you’ve sent is delivered or fails.")]),t._v(" "),e("p",[t._v("You'll need to provide a "),e("code",[t._v("Bearer")]),t._v(" token, for security. We'll add this to the authorization header of the callback request.")]),t._v(" "),e("h2",{attrs:{id:"set-up-callbacks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#set-up-callbacks"}},[t._v("#")]),t._v(" Set up callbacks")]),t._v(" "),e("p",[t._v("You must provide:")]),t._v(" "),e("ul",[e("li",[t._v("a URL where Notify will post the callback to")]),t._v(" "),e("li",[t._v("a "),e("code",[t._v("Bearer")]),t._v(" token, for security, which GC Notify will put in the authorization header of the requests")])]),t._v(" "),e("p",[t._v("To do this:")]),t._v(" "),e("ol",[e("li",[e("a",{attrs:{href:"https://notification.canada.ca/sign-in",target:"_blank",rel:"noopener noreferrer"}},[t._v("Sign in to GC Notify"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("li",[t._v("Go to the "),e("strong",[t._v("API integration")]),t._v(" page.")]),t._v(" "),e("li",[t._v("Select "),e("strong",[t._v("Callbacks")]),t._v(".")])]),t._v(" "),e("p",[t._v("When creating a "),e("code",[t._v("Bearer")]),t._v(" token, you should:")]),t._v(" "),e("ul",[e("li",[t._v("Keep your "),e("code",[t._v("Bearer")]),t._v(" token secure")]),t._v(" "),e("li",[t._v("Change it if you have any reason to think it might no longer be trusted")]),t._v(" "),e("li",[t._v("Make sure that callbacks you receive from GC Notify contain your bearer token in the "),e("code",[t._v("Authorization")]),t._v(" header")]),t._v(" "),e("li",[t._v("Use a hashed value so that GC Notify doesn't hold the true token")])]),t._v(" "),e("h2",{attrs:{id:"health-check-requests"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#health-check-requests"}},[t._v("#")]),t._v(" Health check requests")]),t._v(" "),e("p",[t._v("GC Notify sends health check requests to the URL you provided, to verify that we can reach and receive a response from your API.")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"health_check"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"true"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("We send these health checks when you:")]),t._v(" "),e("ul",[e("li",[t._v("Set up callbacks.")]),t._v(" "),e("li",[t._v("Update a callback configuration.")]),t._v(" "),e("li",[t._v("Test your service's response time via the callbacks page.")])]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("GC Notify offers API response time testing")]),t._v(" "),e("p",[t._v("You can access it directly from our website. From your service dashboard, visit "),e("code",[t._v("API Integration > Callbacks")]),t._v(".")])]),t._v(" "),e("h2",{attrs:{id:"maintaining-your-callbacks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#maintaining-your-callbacks"}},[t._v("#")]),t._v(" Maintaining your callbacks")]),t._v(" "),e("p",[t._v("When you set up API callbacks for your GCNotify service, make sure that your API has "),e("strong",[t._v("consistent uptime")]),t._v(" and can respond within "),e("strong",[t._v("1 second.")]),t._v(" It is important to:")]),t._v(" "),e("ul",[e("li",[t._v("Maintain adequate API logging to help you diagnose issues.")]),t._v(" "),e("li",[t._v("Identify and address bottlenecks in your code and infrastructure.")]),t._v(" "),e("li",[t._v("Monitor and test your API's response times.")])]),t._v(" "),e("h3",{attrs:{id:"delivery-retries-and-suspensions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#delivery-retries-and-suspensions"}},[t._v("#")]),t._v(" Delivery retries and suspensions")]),t._v(" "),e("p",[t._v("GC Notify continues trying to deliver until a callback fails 25 times in 5 minutes. After that, we'll email to inform you there's a problem with your API.")]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("Temporary suspensions")]),t._v(" "),e("p",[t._v("If GC Notify has "),e("strong",[t._v("frequent")]),t._v(" problems delivering callbacks to your API, we may "),e("strong",[t._v("temporarily")]),t._v(" suspend callback deliveries for your service and send you an email with steps to resolve the suspension.")])]),t._v(" "),e("h2",{attrs:{id:"message-delivery-receipts"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#message-delivery-receipts"}},[t._v("#")]),t._v(" Message delivery receipts")]),t._v(" "),e("p",[t._v("When you send an email or text message, GC Notify will send a receipt to your callback URL to tell you if it was delivered or not. This is an automated method to get the status of messages.")]),t._v(" "),e("p",[t._v("This functionality works with test API keys, but does not work with smoke testing email addresses or phone numbers.")]),t._v(" "),e("p",[t._v("The callback message is formatted in JSON. All of the values are strings. The key, description and format of the callback message arguments will be:")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[t._v("Key")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("String format")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("id")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("GC Notify’s id for the status receipts")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("UUID")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("reference")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("The reference sent by the service")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("12345678")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("to")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("The email address or phone number of the recipient")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("hello@canada.ca or 01234567890")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("status")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("The status of the notification")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("created")]),t._v(", "),e("code",[t._v("sending")]),t._v(", "),e("code",[t._v("pending")]),t._v(", "),e("code",[t._v("sent")]),t._v(", "),e("code",[t._v("delivered")]),t._v(", "),e("code",[t._v("permanent-failure")]),t._v(", "),e("code",[t._v("temporary-failure")]),t._v(", "),e("code",[t._v("technical-failure")]),t._v(", "),e("code",[t._v("pending-virus-check")]),t._v(" or "),e("code",[t._v("virus-scan-failed")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("status_description")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("Label for notification's delivery status")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("In transit")]),t._v(", "),e("code",[t._v("In transit")]),t._v(", "),e("code",[t._v("In transit")]),t._v(", "),e("code",[t._v("Delivered")]),t._v(", "),e("code",[t._v("[Blocked | No such number | No such address]")]),t._v(", "),e("code",[t._v("[Content or inbox issue | Carrier issue]")]),t._v(", "),e("code",[t._v("Tech issue")]),t._v(", "),e("code",[t._v("In transit")]),t._v(", "),e("code",[t._v("Attachment has virus")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("provider_response")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("The detailed response from the provider. This will only be not null in a case of a technical failure")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("Blocked as spam by phone carrier")]),t._v(" (or any other message) or nil")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("created_at")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("The time the service sent the request")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("2017-05-14T12:15:30.000000Z")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("completed_at")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("The last time the status was updated")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("2017-05-14T12:15:30.000000Z")]),t._v(" or nil")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("sent_at")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("The time the notification was sent")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("2017-05-14T12:15:30.000000Z")]),t._v(" or nil")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("notification_type")])]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("The notification type")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[e("code",[t._v("email")]),t._v(" or "),e("code",[t._v("sms")])])])])]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("Multiple callbacks for a notification")]),t._v(" "),e("p",[t._v("You might receive multiple callbacks for one sent notification. For example, the receiving mail server might accept the email (triggering a delivery notification), but after processing the email, the receiving mail server might determine that the email actually results in a bounce (triggering a bounce notification).")]),t._v(" "),e("p",[t._v("Callbacks are sent in the order they are received.")])])])}),[],!1,null,null,null);e.default=i.exports}}]);