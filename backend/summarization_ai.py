import cohere 
co = cohere.Client('76JzRcCMdAJaylHBzzK3EuebwmQqg2SYsUyyuN2o') # This is your trial API key
response = co.summarize( 
  text='''Summarize this dialogue:
Customer: Please connect me with a support agent.
AI: Hi there, how can I assist you today?
Customer: I forgot my password and lost access to the email affiliated to my account. Can you please help me?
AI: Yes of course. First I'll need to confirm your identity and then I can connect you with one of our support agents.
TLDR: A customer lost access to their account.
--
Summarize this dialogue:
AI: Hi there, how can I assist you today?
Customer: I want to book a product demo.
AI: Sounds great. What country are you located in?
Customer: I'll connect you with a support agent who can get something scheduled for you.
TLDR: A customer wants to book a product demo.
--
Summarize this dialogue:
AI: Hi there, how can I assist you today?
Customer: I want to get more information about your pricing.
AI: I can pull this for you, just a moment.
TLDR:''',
  length='auto',
  format='auto',
  model='command',
  additional_command='',
  temperature=0.3,
) 
print('Summary:', response.summary)