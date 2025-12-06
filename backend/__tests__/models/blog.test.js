import '../setup.js';
import mongoose from 'mongoose';
import Blog from '../../models/blog.model.js';

describe('Blog Model Test', () => {
  const getUniqueBlogData = () => ({
    title: `Test Blog ${getTestId()}`,
    content: 'Test blog content',
    author: new mongoose.Types.ObjectId(),
    tags: ['test', 'jest'],
    image: `http://example.com/image-${getTestId()}.jpg`
  });

  it('should create & save blog post successfully', async () => {
    const validBlog = new Blog(getUniqueBlogData());
    const savedBlog = await validBlog.save();
    
    expect(savedBlog._id).toBeDefined();
    expect(savedBlog.title).toBe(validBlog.title);
    expect(savedBlog.content).toBe(validBlog.content);
    expect(savedBlog.author.toString()).toBe(validBlog.author.toString());
    expect(savedBlog.tags).toEqual(expect.arrayContaining(validBlog.tags));
    expect(savedBlog.image).toBe(validBlog.image);
  });

  it('should fail to save blog without required fields', async () => {
    const blogWithoutRequiredField = new Blog({
      title: `Missing Fields Blog ${getTestId()}`
    });
    let err;
    try {
      await blogWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should save blog without optional fields', async () => {
    const blogData = getUniqueBlogData();
    delete blogData.tags;
    delete blogData.image;
    
    const blogWithoutOptionalFields = new Blog({
      title: blogData.title,
      content: blogData.content,
      author: blogData.author
    });
    
    const savedBlog = await blogWithoutOptionalFields.save();
    expect(savedBlog._id).toBeDefined();
    expect(savedBlog.tags).toHaveLength(0);
    expect(savedBlog.image).toBeUndefined();
  });
});