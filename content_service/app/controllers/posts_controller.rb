# # class PostsController < ApplicationController
# # end


# class PostsController < ApplicationController
#     before_action :set_post, only: [:show, :edit, :update, :destroy]
  
#     # GET /posts
#     def index
#       @posts = Post.all
#     end
  
#     # GET /posts/1
#     def show
#     end
  
#     # GET /posts/new
#     def new
#       @post = Post.new
#     end
  
#     # GET /posts/1/edit
#     def edit
#     end
  
#     # POST /posts
#     def create
#       @post = Post.new(post_params)
  
#       if @post.save
#         redirect_to @post, notice: 'Post was successfully created.'
#       else
#         render :new
#       end
#     end
  
#     # PATCH/PUT /posts/1
#     def update
#       if @post.update(post_params)
#         redirect_to @post, notice: 'Post was successfully updated.'
#       else
#         render :edit
#       end
#     end
  
#     # DELETE /posts/1
#     def destroy
#       @post.destroy
#       redirect_to posts_url, notice: 'Post was successfully destroyed.'
#     end
  
#     private
#       # Use callbacks to share common setup or constraints between actions.
#       def set_post
#         @post = Post.find(params[:id])
#       end
  
#       # Only allow a list of trusted parameters through.
#       def post_params
#         params.require(:post).permit(:title, :body, :published_at)
#       end
#       # for search
#       def search
#         @posts = Post.search(params[:query])
#       end
      
#   end
  

class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  def index
    if params[:query].present?
      @posts = Post.search(params[:query]).records
    else
      @posts = Post.all
    end
  end

  # GET /posts/1
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      # Index document on Elasticsearch
      @post.__elasticsearch__.index_document
      redirect_to @post, notice: 'Post was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      # Update document in Elasticsearch
      @post.__elasticsearch__.index_document
      redirect_to @post, notice: 'Post was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
    # Delete document from Elasticsearch
    @post.__elasticsearch__.delete_document
    redirect_to posts_url, notice: 'Post was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body, :published_at)
    end
end
