const express = require('express');
const app = express();
const dialogflow = require('dialogflow-fulfillment');


app.get('/', (req, res) => {
   res.send("We are live");
});

app.post('/', express.json(), (req, res) => {
    const agent = new dialogflow.WebhookClient({
        request: req,
        response: res
    });

    function demo(agent) {
        agent.add("Sending Response from webhook server");
    }

    function hireandmeet(agent) {
        agent.add("Please give me your name");        
    }

    function askEmail(agent) {
        let context = agent.context.get('awaiting_name');

        agent.context.set({
            'name':'new-output-context',
            'lifespan': 5,
            'parameters':{
                'parameter-name': context.parameters
                }
        });

        agent.add('give me your email man');
    }

    var intentMap = new Map();
    intentMap.set('webhookDemo', demo);
    intentMap.set('HireAndMeeting', hireandmeet);
    intentMap.set('AskEmail', askEmail);

    agent.handleRequest(intentMap);
})

app.listen(7000, () => console.log("Hello"));