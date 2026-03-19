import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  type Zone = {
    #soundscape;
    #devden;
    #artistic;
  };

  module Zone {
    public func toText(zone : Zone) : Text {
      switch (zone) {
        case (#soundscape) { "Soundscape" };
        case (#devden) { "DevDen" };
        case (#artistic) { "Artistic" };
      };
    };
  };

  type Post = {
    title : Text;
    content : Text;
    zone : Zone;
    author : Text;
    timestamp : Time.Time;
  };

  module Post {
    public func compareByTimestamp(post1 : Post, post2 : Post) : Order.Order {
      if (post1.timestamp < post2.timestamp) {
        #less;
      } else if (post1.timestamp > post2.timestamp) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  let posts = List.empty<Post>();

  public shared ({ caller }) func addPost(title : Text, content : Text, zone : Zone, author : Text) : async () {
    let post : Post = {
      title;
      content;
      zone;
      author;
      timestamp = Time.now();
    };
    posts.add(post);
  };

  public query ({ caller }) func getAllPosts() : async [Post] {
    posts.toArray().sort(Post.compareByTimestamp);
  };
};
