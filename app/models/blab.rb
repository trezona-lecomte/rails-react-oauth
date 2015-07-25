class Blab < ActiveRecord::Base
  validates :content, presence: true
end
