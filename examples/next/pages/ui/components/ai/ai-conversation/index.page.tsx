import { Amplify } from 'aws-amplify';
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import { generateClient } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import '@aws-amplify/ui-react-ai/ai-conversation-styles.css';

import outputs from './amplify_outputs';
import type { Schema } from './amplify/data/resource';
import { Authenticator, Card } from '@aws-amplify/ui-react';

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

Amplify.configure(outputs);

function Chat() {
  const [
    {
      data: { messages },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  return (
    <Card variation="outlined" width="50%" height="300px" margin="0 auto">
      <AIConversation
        messages={messages}
        handleSendMessage={sendMessage}
        isLoading={isLoading}
        suggestedPrompts={[
          {
            inputText: 'hello',
            header: 'hello',
          },
          {
            inputText: 'how are you?',
            header: 'how are you?',
          },
        ]}
        variant="bubble"
      />
    </Card>
  );
}

export default function Example() {
  return (
    <Authenticator>
      {({ user, signOut }) => {
        return <Chat />;
      }}
    </Authenticator>
  );
}
