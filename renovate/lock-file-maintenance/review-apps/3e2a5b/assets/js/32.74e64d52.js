(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{353:function(e,t,a){"use strict";a.r(t);var s=a(6),r=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"api-keys"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#api-keys"}},[e._v("#")]),e._v(" API keys")]),e._v(" "),t("h2",{attrs:{id:"security"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#security"}},[e._v("#")]),e._v(" Security")]),e._v(" "),t("p",[e._v("Always follow these steps:")]),e._v(" "),t("ul",[t("li",[e._v("Use a modern, secure web browser.")]),e._v(" "),t("li",[e._v("Apply security patches within 30 days of release.")]),e._v(" "),t("li",[e._v("Keep API keys in an encrypted file that’s only for authorized staff. Do not share by email, support tickets or put in plain text in a source code repository.")]),e._v(" "),t("li",[e._v("Rotate keys whenever anyone with key access leaves your team.")]),e._v(" "),t("li",[e._v("Give third-party users a unique API key.")])]),e._v(" "),t("p",[e._v("We recommend using a cloud service provider’s key management service to keep API keys secure.")]),e._v(" "),t("h2",{attrs:{id:"key-types"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#key-types"}},[e._v("#")]),e._v(" Key types")]),e._v(" "),t("p",[e._v("There are three different types of API keys:")]),e._v(" "),t("ul",[t("li",[e._v("test")]),e._v(" "),t("li",[e._v("team and safelist")]),e._v(" "),t("li",[e._v("live")])]),e._v(" "),t("p",[e._v("When you set up a new service it will start in trial mode. A service in trial mode can create either "),t("strong",[e._v("test")]),e._v(" or "),t("strong",[e._v("team and safelist")]),e._v(" keys. You must have a live service to create a "),t("strong",[e._v("live key")]),e._v(".")]),e._v(" "),t("p",[e._v("To create an API key:")]),e._v(" "),t("ol",[t("li",[t("a",{attrs:{href:"https://notification.canada.ca/sign-in",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sign in to GC Notify"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("li",[e._v("Go to the "),t("strong",[e._v("API integration")]),e._v(" page.")]),e._v(" "),t("li",[e._v("Select "),t("strong",[e._v("API keys")]),e._v(".")]),e._v(" "),t("li",[e._v("Select "),t("strong",[e._v("Create an API key")]),e._v(".")])]),e._v(" "),t("h2",{attrs:{id:"test"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#test"}},[e._v("#")]),e._v(" Test")]),e._v(" "),t("p",[e._v("Use a test key to test the performance of your service and its integration with GC Notify.")]),e._v(" "),t("p",[e._v("Messages sent using a test key:")]),e._v(" "),t("ul",[t("li",[e._v("generate realistic responses")]),e._v(" "),t("li",[e._v("result in a delivered status")]),e._v(" "),t("li",[e._v("are not actually delivered to a recipient")]),e._v(" "),t("li",[e._v("do not appear on your dashboard")]),e._v(" "),t("li",[e._v("do not count against your email and text message allowances")])]),e._v(" "),t("p",[e._v("To test failure responses with a test key, use the following numbers and addresses:")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",{staticStyle:{"text-align":"left"}},[e._v("Phone number/Email address")]),e._v(" "),t("th",{staticStyle:{"text-align":"left"}},[e._v("Response")])])]),e._v(" "),t("tbody",[t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("+15149301633")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("code",[e._v("temporary-failure")])])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("+15149301632")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("code",[e._v("permanent-failure")])])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("temp-fail@simulator.notify")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("code",[e._v("temporary-failure")])])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("perm-fail@simulator.notify")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("code",[e._v("permanent-failure")])])]),e._v(" "),t("tr",[t("td",{staticStyle:{"text-align":"left"}},[e._v("any other valid number or address")]),e._v(" "),t("td",{staticStyle:{"text-align":"left"}},[t("code",[e._v("delivered")])])])])]),e._v(" "),t("p",[e._v("You do not have to revoke test keys.")]),e._v(" "),t("h2",{attrs:{id:"team-and-safelist"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#team-and-safelist"}},[e._v("#")]),e._v(" Team and safelist")]),e._v(" "),t("p",[e._v("A team and safelist key lets you send real messages to your team members and addresses/numbers on your safelist while your service is still in trial mode.")]),e._v(" "),t("p",[e._v("You will get an error if you use these keys to send messages to anyone who is not on your team or your safelist.")]),e._v(" "),t("p",[e._v("Messages sent with a team and safelist key appear on your dashboard and count against your email and text message allowances.")]),e._v(" "),t("p",[e._v("You do not have to revoke team and safelist keys.")]),e._v(" "),t("h2",{attrs:{id:"live"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#live"}},[e._v("#")]),e._v(" Live")]),e._v(" "),t("p",[e._v("You can only create live keys once your service is live. You can use live keys to send messages to anyone. Request to go live in settings.")]),e._v(" "),t("p",[e._v("Messages sent with a live key appear on your dashboard and count against your text message and email allowances.")]),e._v(" "),t("p",[e._v("You should revoke and re-create these keys on a regular basis. To revoke a key:")]),e._v(" "),t("ol",[t("li",[t("a",{attrs:{href:"https://notification.canada.ca/sign-in",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sign in to GC Notify"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("li",[e._v("Go to the "),t("strong",[e._v("API integration")]),e._v(" page.")]),e._v(" "),t("li",[e._v("Select "),t("strong",[e._v("API keys")]),e._v(".")]),e._v(" "),t("li",[e._v("Select "),t("strong",[e._v("Revoke")]),e._v(" for the API key you want to revoke.")])]),e._v(" "),t("p",[e._v("You can have more than one active key at a time.")]),e._v(" "),t("p",[e._v("You should never send test messages to invalid numbers or addresses using a live key.")])])}),[],!1,null,null,null);t.default=r.exports}}]);