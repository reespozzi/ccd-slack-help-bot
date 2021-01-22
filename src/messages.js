function helpRequestRaised(user, summary, environment, assignedTo, jiraId) {
    return [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `New platform help request raised by <@${user}>`
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": `:warning: Summary: ${summary}`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": `:house: Environment: ${environment}`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":mechanic: Assigned to: "
            },
            "accessory": {
                "type": "users_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Unassigned",
                    "emoji": true
                },
                "action_id": "assign_help_request_to_user"
            }
        },
        {
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": `View on Jira: <https://tools.hmcts.net/jira/browse/${jiraId}|${jiraId}>`
                }
            ]
        },
        {
            "type": "divider"
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": ":eyes: Take it",
                        "emoji": true
                    },
                    "value": "assign_help_request_to_me",
                    "action_id": "assign_help_request_to_me"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": " :white_check_mark: Resolve",
                        "emoji": true
                    },
                    "value": "resolve_help_request",
                    "action_id": "resolve_help_request"
                }
            ]
        },
        {
            "type": "divider"
        }
    ]
}

function option(name, option) {
    return {
        text: {
            type: "plain_text",
            text: name,
            emoji: true
        },
        value: option ?? name.toLowerCase()
    }
}

function openHelpRequestBlocks() {
    return {
        "title": {
            "type": "plain_text",
            "text": "Platform help request"
        },
        "submit": {
            "type": "plain_text",
            "text": "Submit"
        },
        "blocks": [
            {
                "type": "input",
                "block_id": "summary",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "title",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Short description of the issue"
                    }
                },
                "label": {
                    "type": "plain_text",
                    "text": "Issue summary"
                }
            },
            {
                "type": "input",
                "block_id": "urls",
                "optional": true,
                "element": {
                    "type": "plain_text_input",
                    "action_id": "title",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Link to any build or pull request"
                    }
                },
                "label": {
                    "type": "plain_text",
                    "text": "PR / build URLs"
                }
            },
            {
                "type": "input",
                "block_id": "environment",
                "optional": true,
                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Choose an environment",
                        "emoji": true
                    },
                    "options": [
                        option('AAT / Staging', 'staging'),
                        option('Preview / Dev', 'dev'),
                        option('Production'),
                        option('Perftest / Test', 'test'),
                        option('ITHC'),
                        option('N/A', 'none')
                    ],
                    "action_id": "environment"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Environment",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "description",
                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                    "action_id": "description"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Issue description",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "analysis",
                "element": {
                    "type": "plain_text_input",
                    "multiline": true,
                    "action_id": "analysis"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Analysis done so far",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "checked_with_team",
                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        option('No'),
                        option('Yes')
                    ],
                    "action_id": "checked_with_team"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Have you checked with your team?",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "action_required",
                "optional": true,
                "element": {
                    "type": "plain_text_input",
                    "action_id": "plain_text_input-action",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "If you know what needs doing let us know"
                    }
                },
                "label": {
                    "type": "plain_text",
                    "text": "Action required",
                    "emoji": true
                }
            }
        ],
        "type": "modal",
        callback_id: 'create_help_request'
    }

}

async function helloToBotHandler({message, say}) {
    await say({
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Thanks for the mention <@${message.user}>! Click my fancy button`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Button",
                        "emoji": true
                    },
                    "value": "click_me_123",
                    "action_id": "first_button"
                }
            }
        ]
    })
}

module.exports.helpRequestRaised = helpRequestRaised;
module.exports.helloToBotHandler = helloToBotHandler;
module.exports.openHelpRequestBlocks = openHelpRequestBlocks;