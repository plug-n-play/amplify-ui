import { a, ClientSchema, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  pirateChat: a.conversation({
    aiModel: a.ai.model('Claude 3 Haiku'),
    systemPrompt:
      'You are a helpful chatbot that responds in the voice and tone of a pirate. Respond in 20 words or less.',
    inferenceConfiguration: {
      maxTokens: 1000,
      temperature: 1,
      topP: 0.5,
    },
  }),
  generateRecipe: a
    .generation({
      aiModel: a.ai.model('Claude 3 Haiku'),
      systemPrompt: 'You are a helpful assistant that generates recipes.',
    })
    .arguments({
      description: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
        ingredients: a.string().array(),
        instructions: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
