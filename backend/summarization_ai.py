import cohere 
co = cohere.Client('76JzRcCMdAJaylHBzzK3EuebwmQqg2SYsUyyuN2o') # This is your trial API key
response = co.summarize( 
  text='{text}',
  length='auto',
  format='auto',
  model='command',
  additional_command='',
  temperature=0.3,
) 
print('Summary:', response.summary)