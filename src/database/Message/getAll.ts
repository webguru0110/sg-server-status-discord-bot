import MessageModel, { MessageModelType } from './_model';

const getAllMessages = async (): Promise<MessageModelType[]> => {
  const messages = await MessageModel.find();

  return messages;
};

export default getAllMessages;
