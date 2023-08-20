import MessageModel, { MessageModelType } from './_model';

const deleteMessage = async ({ channelId, messageId }: MessageModelType): Promise<boolean> => {
  try {
    await MessageModel.deleteOne({ channelId, messageId });
  } catch {
    return false;
  }

  return true;
};

export default deleteMessage;
