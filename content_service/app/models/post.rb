# class Post < ApplicationRecord
# end


# # # app/models/post.rb

# # class Post < ApplicationRecord
# #     include Elasticsearch::Model
  
# #     # Define Elasticsearch index settings and mapping
# #     settings index: { number_of_shards: 1 } do
# #       mappings dynamic: 'false' do
# #         indexes :title, type: 'text'
# #         indexes :content, type: 'text'
# #         # Add more fields as needed
# #       end
# #     end
  
# #     # Automatically index a Post record after it's created
# #     after_commit :index_document, on: [:create]
  
# #     private
  
# #     def index_document
# #       __elasticsearch__.index_document
# #     end
# #   end
  

class Post < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  settings index: { number_of_shards: 1 } do
    mappings dynamic: 'false' do
      indexes :title, analyzer: 'english'
      indexes :content, analyzer: 'english'
    end
  end
end
