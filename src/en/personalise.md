# Personalising messages

## Variables

To add personalised information about the message recipients, use double brackets around the variable name. Recipients are more likely to trust information that's relevant and clearly meant for them.

For example:
```
Hello ((given name)),
This is a confirmation message for your appointment on ((appointment date)).
```

When you send your message, you'll be able to replace the placeholder variables with personalised content. You can do this manually for one recipient or upload a list of recipients with personal details and let GC Notify do it for you.

## Conditional text

To add optional conditional text, in double brackets, use two question marks after your condition variable and before the text that appears if the condition is met.

For example:
```
Hello,
We're happy to announce that you can now enroll in the program.
((under18??Please get your application signed by a parent or guardian.))
```

When you send your message, you'll need to indicaate 'yes' for whether a recipient meets the condition, to show the conditional text. You can do this manually or upload a list of recipients with a column that indicates the condition.
