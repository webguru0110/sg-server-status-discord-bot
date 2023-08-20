import { Document, model, Schema } from 'mongoose';

export type MessageModelType = Document & {
  channelId: string;
  messageId: string;
  serverHost: string;
  serverPort: number;
  timestamp: number;
};

const Model = new Schema<MessageModelType>({
  channelId: String,
  messageId: String,
  serverHost: String,
  serverPort: Number,
  timestamp: Number,
});

const MessageModel = model<MessageModelType>('message', Model);

export default MessageModel;
