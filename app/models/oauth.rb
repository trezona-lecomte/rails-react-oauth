class Oauth < ActiveRecord::Base
  validates :token, presence: true
end
