import { a, ClientSchema, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  pirateChat: a.conversation({
    // better dx for aiModel in progress
    aiModel: a.ai.model('Claude 3 Haiku'),
    systemPrompt:
      'You are a helpful chatbot that responds in the voice and tone of a pirate. Respond in 20 words or less.',
    // these aren't used yet
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
  generateWhatever: a
    .generation({
      aiModel: a.ai.model('Claude 3 Haiku'),
      systemPrompt: 'You are a helpful assistant that generates recipes.',
    })
    .arguments({
      description2222: a.string(),
    })
    .returns(
      a.customType({
        name111: a.string(),
        ingredients222: a.string().array(),
        instructions333: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;
type foo = Schema['generateRecipe'];

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
